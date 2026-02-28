# VIP Expert Data Isolation: Technical Implementation

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Specification Complete
**Classification:** Security Critical

---

## Overview

VIP Expert Data Isolation is the most critical security feature of the JoyMatcher admin system. It ensures that freelance matchmakers (external contractors) can ONLY access their assigned VIP clients and cannot browse, search, or view any other platform users. This document provides comprehensive technical implementation details for enforcing data isolation at every system layer.

---

## Core Security Principles

### 1. Zero-Trust Architecture
- **Assumption:** VIP Experts are external contractors and must be treated as potential security risks
- **Enforcement:** Every database query, API call, and UI interaction is validated
- **Default Deny:** Access is denied by default; only explicitly assigned clients are accessible
- **No Bypass:** Super Admin cannot disable isolation checks (hardcoded security)

### 2. Defense in Depth
Isolation is enforced at multiple layers:
1. **Database Layer:** Query filters and row-level security
2. **API Layer:** Middleware validation and permission checks
3. **Business Logic Layer:** Service-level access control
4. **UI Layer:** Client-side view restrictions
5. **Audit Layer:** All access attempts logged

### 3. Explicit Assignment Model
- VIP Experts have no implicit access to any data
- Access is granted ONLY through explicit `VIPAssignment` records
- Assignments must be active (status = 'active')
- Deactivated assignments immediately revoke access

---

## Data Model

### VIPAssignment Schema

```javascript
const VIPAssignmentSchema = new Schema({
  // Unique assignment identifier
  assignmentId: {
    type: String,
    required: true,
    unique: true,
    default: () => `assign_${uuidv4()}`
  },

  // VIP Expert who receives the assignment
  expertId: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
    index: true
  },

  // VIP client being assigned
  vipUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // Assignment status
  status: {
    type: String,
    enum: ['pending', 'active', 'inactive', 'completed', 'reassigned'],
    default: 'pending',
    required: true,
    index: true
  },

  // Who created this assignment (VIP Coordinator or Super Admin)
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },

  // When assignment became active
  assignedAt: {
    type: Date,
    default: Date.now,
    index: true
  },

  // When assignment was completed/ended
  endedAt: {
    type: Date,
    default: null
  },

  // Reason for reassignment (if status = 'reassigned')
  reassignmentReason: {
    type: String,
    enum: [
      'client_request',
      'expert_request',
      'poor_performance',
      'conflict_of_interest',
      'expert_unavailable',
      'coordinator_decision'
    ]
  },

  // Performance tracking
  performanceMetrics: {
    introductionsSent: { type: Number, default: 0 },
    introductionsAccepted: { type: Number, default: 0 },
    successfulMatches: { type: Number, default: 0 },
    clientSatisfactionRating: { type: Number, default: null }, // 1-5
    lastActivityDate: { type: Date, default: Date.now }
  },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Compound index for fast lookups
VIPAssignmentSchema.index({ expertId: 1, status: 1 });
VIPAssignmentSchema.index({ vipUserId: 1, status: 1 });

// Ensure only one active assignment per VIP client
VIPAssignmentSchema.index(
  { vipUserId: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: 'active' }
  }
);
```

### Assignment Creation Flow

```javascript
/**
 * Create new VIP assignment
 * Only VIP Coordinators and Super Admins can call this
 */
async function createVIPAssignment({ expertId, vipUserId, assignedBy }) {
  // 1. Validate VIP client exists and is actually VIP tier
  const vipUser = await User.findById(vipUserId);
  if (!vipUser || vipUser.subscription !== 'vip') {
    throw new Error('Invalid VIP user');
  }

  // 2. Validate expert exists and has vipExpert role
  const expert = await Admin.findById(expertId);
  if (!expert || expert.role !== 'vipExpert') {
    throw new Error('Invalid VIP expert');
  }

  // 3. Check for existing active assignment
  const existingAssignment = await VIPAssignment.findOne({
    vipUserId,
    status: 'active'
  });

  if (existingAssignment) {
    throw new Error('VIP client already has an active expert assignment');
  }

  // 4. Create new assignment
  const assignment = await VIPAssignment.create({
    expertId,
    vipUserId,
    assignedBy,
    status: 'active',
    assignedAt: new Date()
  });

  // 5. Log assignment creation
  await AuditLog.create({
    action: 'vip_assignment_created',
    adminId: assignedBy,
    targetId: vipUserId,
    metadata: {
      assignmentId: assignment.assignmentId,
      expertId: expertId,
      expertEmail: expert.email
    }
  });

  // 6. Send notification to expert
  await sendExpertNotification({
    expertId,
    type: 'new_client_assigned',
    data: {
      clientId: vipUserId,
      clientName: vipUser.firstName,
      assignmentId: assignment.assignmentId
    }
  });

  return assignment;
}
```

---

## Database Layer Isolation

### Row-Level Security (PostgreSQL Example)

For PostgreSQL deployments, use Row-Level Security (RLS):

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: VIP Experts can only see assigned clients
CREATE POLICY vip_expert_isolation ON users
  FOR SELECT
  TO vip_expert_role
  USING (
    EXISTS (
      SELECT 1
      FROM vip_assignments
      WHERE vip_assignments.vip_user_id = users.id
        AND vip_assignments.expert_id = current_setting('app.current_admin_id')::uuid
        AND vip_assignments.status = 'active'
    )
  );

-- Set admin ID in session
SET app.current_admin_id = 'expert_user_id_here';
```

### MongoDB Query Filtering

For MongoDB deployments, enforce filtering in all queries:

```javascript
/**
 * Base query builder for VIP Expert access
 * Automatically adds assignment filter to all queries
 */
class VIPExpertQueryBuilder {
  constructor(expertId) {
    this.expertId = expertId;
  }

  /**
   * Get list of assigned VIP user IDs
   */
  async getAssignedClientIds() {
    const assignments = await VIPAssignment.find({
      expertId: this.expertId,
      status: 'active'
    }).select('vipUserId');

    return assignments.map(a => a.vipUserId);
  }

  /**
   * Build query with automatic isolation filter
   */
  async buildQuery(baseQuery = {}) {
    const assignedIds = await this.getAssignedClientIds();

    // Enforce isolation: ONLY assigned clients
    return {
      ...baseQuery,
      _id: { $in: assignedIds },
      subscription: 'vip' // Additional safety check
    };
  }

  /**
   * Safe find operation with isolation
   */
  async findUsers(query = {}) {
    const isolatedQuery = await this.buildQuery(query);
    return User.find(isolatedQuery);
  }

  /**
   * Safe findOne operation with isolation
   */
  async findUser(userId) {
    const assignedIds = await this.getAssignedClientIds();

    // Check if userId is in assigned list
    if (!assignedIds.some(id => id.toString() === userId.toString())) {
      throw new ForbiddenError('This client is not assigned to you');
    }

    return User.findById(userId);
  }
}
```

### Query Interceptor Middleware

```javascript
/**
 * Mongoose plugin to automatically enforce VIP Expert isolation
 */
function vipExpertIsolationPlugin(schema) {
  // Intercept find queries
  schema.pre('find', async function() {
    const context = this.options.context;

    if (context?.adminRole === 'vipExpert') {
      const queryBuilder = new VIPExpertQueryBuilder(context.adminId);
      const isolatedQuery = await queryBuilder.buildQuery(this.getQuery());
      this.setQuery(isolatedQuery);
    }
  });

  // Intercept findOne queries
  schema.pre('findOne', async function() {
    const context = this.options.context;

    if (context?.adminRole === 'vipExpert') {
      const queryBuilder = new VIPExpertQueryBuilder(context.adminId);
      const requestedId = this.getQuery()._id;

      // Validate access before query executes
      const assignedIds = await queryBuilder.getAssignedClientIds();
      const hasAccess = assignedIds.some(
        id => id.toString() === requestedId.toString()
      );

      if (!hasAccess) {
        throw new ForbiddenError('Access denied to this client');
      }
    }
  });
}

// Apply plugin to User model
UserSchema.plugin(vipExpertIsolationPlugin);
```

---

## API Layer Isolation

### Authentication Middleware

```javascript
/**
 * Extract and validate admin from JWT token
 */
async function authenticateAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No authentication token' });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // Fetch admin from database
    const admin = await Admin.findById(decoded.adminId);

    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: 'Invalid or inactive admin' });
    }

    // Attach admin to request
    req.admin = admin;
    req.adminId = admin._id;
    req.adminRole = admin.role;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
}
```

### VIP Expert Isolation Middleware

```javascript
/**
 * Enforce VIP Expert data isolation on all routes
 * CRITICAL: This middleware must be applied to ALL VIP expert routes
 */
async function enforceVIPExpertIsolation(req, res, next) {
  const { admin, adminRole } = req;

  // Only enforce for VIP Experts
  if (adminRole !== 'vipExpert') {
    return next();
  }

  // Extract client ID from various possible locations
  const clientId =
    req.params.clientId ||
    req.params.userId ||
    req.query.clientId ||
    req.body.clientId;

  // If no specific client requested, continue (will be handled by query builder)
  if (!clientId) {
    return next();
  }

  try {
    // Verify assignment exists and is active
    const assignment = await VIPAssignment.findOne({
      expertId: admin._id,
      vipUserId: clientId,
      status: 'active'
    });

    if (!assignment) {
      // Log unauthorized access attempt
      await AuditLog.create({
        action: 'unauthorized_access_attempt',
        adminId: admin._id,
        adminRole: 'vipExpert',
        targetId: clientId,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        requestPath: req.path,
        result: 'denied'
      });

      return res.status(403).json({
        error: 'Access Denied',
        message: 'This VIP client is not assigned to you',
        code: 'VIP_EXPERT_ISOLATION_VIOLATION'
      });
    }

    // Attach assignment to request for use in route handlers
    req.vipAssignment = assignment;
    next();

  } catch (error) {
    console.error('VIP Expert isolation check failed:', error);
    return res.status(500).json({ error: 'Access validation failed' });
  }
}

/**
 * Convenience middleware: Require active assignment
 */
function requireActiveAssignment(req, res, next) {
  if (!req.vipAssignment) {
    return res.status(403).json({
      error: 'No active assignment found',
      message: 'You must have an active client assignment to perform this action'
    });
  }
  next();
}
```

### Route Protection Examples

```javascript
// VIP Expert Routes (isolated)
const vipExpertRouter = express.Router();

// Apply authentication + isolation to ALL routes
vipExpertRouter.use(authenticateAdmin);
vipExpertRouter.use(enforceVIPExpertIsolation);

// Get assigned clients list
vipExpertRouter.get('/clients', async (req, res) => {
  const queryBuilder = new VIPExpertQueryBuilder(req.adminId);
  const clients = await queryBuilder.findUsers();

  res.json({
    clients: clients.map(client => ({
      id: client._id,
      name: client.firstName,
      age: client.age,
      location: client.location,
      tierProgress: client.tierProgress
    }))
  });
});

// Get specific client details
vipExpertRouter.get('/clients/:clientId', async (req, res) => {
  // Assignment already verified by middleware
  const { clientId } = req.params;

  const client = await User.findById(clientId);

  res.json({
    client: {
      id: client._id,
      fullProfile: client.toJSON(),
      assignment: req.vipAssignment
    }
  });
});

// Search matches FOR assigned client
vipExpertRouter.post('/clients/:clientId/search-matches',
  requireActiveAssignment,
  async (req, res) => {
    const { clientId } = req.params;
    const { filters } = req.body;

    // VIP Expert can search ALL users to find matches
    // But results are contextualized for their assigned client
    const matches = await searchCompatibleMatches({
      forClientId: clientId,
      filters: filters,
      expertId: req.adminId
    });

    res.json({ matches });
  }
);

// Create introduction proposal
vipExpertRouter.post('/clients/:clientId/introductions',
  requireActiveAssignment,
  async (req, res) => {
    const { clientId } = req.params;
    const { matchUserId, personalizedNote } = req.body;

    const introduction = await createIntroduction({
      vipClientId: clientId,
      matchUserId,
      expertId: req.adminId,
      personalizedNote
    });

    res.json({ introduction });
  }
);

// FORBIDDEN: Browse all VIP clients (will fail isolation check)
vipExpertRouter.get('/all-vip-clients', async (req, res) => {
  // This route is allowed to exist, but query will be filtered
  const queryBuilder = new VIPExpertQueryBuilder(req.adminId);
  const clients = await queryBuilder.findUsers(); // Returns ONLY assigned clients

  res.json({ clients }); // Expert thinks they see "all" but it's filtered
});

module.exports = vipExpertRouter;
```

---

## Business Logic Layer Isolation

### Service Class with Built-in Isolation

```javascript
/**
 * VIP Expert Service with automatic isolation enforcement
 */
class VIPExpertService {
  constructor(expertId) {
    this.expertId = expertId;
    this.queryBuilder = new VIPExpertQueryBuilder(expertId);
  }

  /**
   * Get assigned clients
   */
  async getAssignedClients() {
    return this.queryBuilder.findUsers();
  }

  /**
   * Get specific client (with isolation check)
   */
  async getClient(clientId) {
    return this.queryBuilder.findUser(clientId);
  }

  /**
   * Search compatible matches for assigned client
   * Note: Can search ALL users, but only for assigned client's benefit
   */
  async searchMatchesForClient(clientId, filters = {}) {
    // First verify client is assigned
    await this.getClient(clientId);

    // Fetch client preferences
    const client = await User.findById(clientId);
    const { preferences, dealBreakers } = client.vipProfile;

    // Build match query (searches ALL users, not just assigned)
    const matchQuery = {
      subscription: { $in: ['premium', 'vip'] },
      tierProgress: { $gte: 4 }, // Must have completed Tier 4
      _id: { $ne: clientId }, // Exclude client themselves
      ...filters
    };

    // Apply preference filters
    if (preferences.ageRange) {
      matchQuery.age = {
        $gte: preferences.ageRange.min,
        $lte: preferences.ageRange.max
      };
    }

    if (preferences.location) {
      matchQuery.location = preferences.location;
    }

    // Execute search
    const matches = await User.find(matchQuery).limit(20);

    // Log search for audit
    await AuditLog.create({
      action: 'match_search_performed',
      adminId: this.expertId,
      targetId: clientId,
      metadata: {
        filtersApplied: filters,
        resultsCount: matches.length
      }
    });

    return matches;
  }

  /**
   * Create introduction proposal
   */
  async createIntroduction({ clientId, matchUserId, personalizedNote }) {
    // Verify client is assigned
    await this.getClient(clientId);

    // Verify match user exists
    const matchUser = await User.findById(matchUserId);
    if (!matchUser) {
      throw new Error('Match user not found');
    }

    // Create introduction record
    const introduction = await Introduction.create({
      vipClientId: clientId,
      matchUserId,
      expertId: this.expertId,
      personalizedNote,
      status: 'pending',
      createdAt: new Date()
    });

    // Update assignment metrics
    await VIPAssignment.updateOne(
      { expertId: this.expertId, vipUserId: clientId },
      {
        $inc: { 'performanceMetrics.introductionsSent': 1 },
        $set: { 'performanceMetrics.lastActivityDate': new Date() }
      }
    );

    return introduction;
  }

  /**
   * Add private notes to client profile
   */
  async addClientNote(clientId, noteContent) {
    // Verify client is assigned
    await this.getClient(clientId);

    const note = await ExpertNote.create({
      expertId: this.expertId,
      clientId,
      content: noteContent,
      createdAt: new Date()
    });

    return note;
  }

  /**
   * Get own performance metrics
   */
  async getPerformanceMetrics() {
    const assignments = await VIPAssignment.find({
      expertId: this.expertId,
      status: { $in: ['active', 'completed'] }
    });

    const totalIntroductions = assignments.reduce(
      (sum, a) => sum + a.performanceMetrics.introductionsSent, 0
    );

    const totalAccepted = assignments.reduce(
      (sum, a) => sum + a.performanceMetrics.introductionsAccepted, 0
    );

    const totalSuccessful = assignments.reduce(
      (sum, a) => sum + a.performanceMetrics.successfulMatches, 0
    );

    const avgRating = assignments
      .filter(a => a.performanceMetrics.clientSatisfactionRating)
      .reduce((sum, a) => sum + a.performanceMetrics.clientSatisfactionRating, 0)
      / assignments.length;

    return {
      activeClients: assignments.filter(a => a.status === 'active').length,
      totalClients: assignments.length,
      introductionsSent: totalIntroductions,
      acceptanceRate: totalIntroductions > 0 ? (totalAccepted / totalIntroductions) : 0,
      successfulMatches: totalSuccessful,
      averageRating: avgRating || 0
    };
  }
}
```

---

## Frontend Isolation

### UI State Management

```javascript
/**
 * VIP Expert Dashboard Store (React + Redux)
 */
const vipExpertSlice = createSlice({
  name: 'vipExpert',
  initialState: {
    assignedClients: [],
    currentClient: null,
    matchSearchResults: [],
    performanceMetrics: null,
    isLoading: false,
    error: null
  },
  reducers: {
    setAssignedClients: (state, action) => {
      state.assignedClients = action.payload;
    },
    setCurrentClient: (state, action) => {
      // Verify client is in assigned list before setting
      const isAssigned = state.assignedClients.some(
        c => c.id === action.payload.id
      );

      if (!isAssigned) {
        state.error = 'Access denied: Client not assigned';
        return;
      }

      state.currentClient = action.payload;
    },
    clearCurrentClient: (state) => {
      state.currentClient = null;
    }
  }
});

/**
 * API calls with automatic error handling for isolation violations
 */
export const fetchAssignedClients = () => async (dispatch) => {
  try {
    const response = await api.get('/admin/vip-expert/clients');
    dispatch(setAssignedClients(response.data.clients));
  } catch (error) {
    if (error.response?.status === 403) {
      // Isolation violation
      dispatch(showError('Access denied. Please contact your coordinator.'));
      dispatch(logoutExpert());
    }
  }
};

export const fetchClientDetails = (clientId) => async (dispatch, getState) => {
  // Check if client is in assigned list
  const { assignedClients } = getState().vipExpert;
  const isAssigned = assignedClients.some(c => c.id === clientId);

  if (!isAssigned) {
    dispatch(showError('This client is not assigned to you'));
    return;
  }

  try {
    const response = await api.get(`/admin/vip-expert/clients/${clientId}`);
    dispatch(setCurrentClient(response.data.client));
  } catch (error) {
    if (error.response?.status === 403) {
      dispatch(showError('Access denied'));
      dispatch(logoutExpert());
    }
  }
};
```

### UI Components with Isolation Awareness

```jsx
/**
 * VIP Expert Dashboard Component
 */
function VIPExpertDashboard() {
  const dispatch = useDispatch();
  const { assignedClients, isLoading } = useSelector(state => state.vipExpert);

  useEffect(() => {
    dispatch(fetchAssignedClients());
  }, [dispatch]);

  return (
    <div className="vip-expert-dashboard">
      <h1>My Assigned Clients</h1>

      {/* No search/browse functionality for other clients */}
      {/* Only show assigned list */}

      <div className="clients-grid">
        {assignedClients.map(client => (
          <ClientCard
            key={client.id}
            client={client}
            onClick={() => dispatch(fetchClientDetails(client.id))}
          />
        ))}
      </div>

      {assignedClients.length === 0 && (
        <EmptyState message="No clients assigned yet. Your coordinator will assign clients to you." />
      )}
    </div>
  );
}

/**
 * Protected Route Component
 */
function ProtectedVIPExpertRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Verify user is VIP Expert
    if (currentUser?.role !== 'vipExpert') {
      navigate('/admin/unauthorized');
    }
  }, [currentUser, navigate]);

  // Prevent direct URL access to client IDs not assigned
  const { clientId } = useParams();
  const { assignedClients } = useSelector(state => state.vipExpert);

  if (clientId) {
    const isAssigned = assignedClients.some(c => c.id === clientId);
    if (!isAssigned) {
      return <AccessDenied message="This client is not assigned to you" />;
    }
  }

  return children;
}
```

---

## Security Monitoring & Alerts

### Real-Time Violation Detection

```javascript
/**
 * Security monitor for VIP Expert isolation violations
 */
class VIPExpertSecurityMonitor {
  constructor() {
    this.violationThreshold = 3; // Flag after 3 violations
    this.timeWindow = 3600000; // 1 hour
  }

  /**
   * Check for repeated violation attempts
   */
  async checkViolationPattern(expertId) {
    const recentViolations = await AuditLog.find({
      action: 'unauthorized_access_attempt',
      adminId: expertId,
      timestamp: { $gte: new Date(Date.now() - this.timeWindow) }
    });

    if (recentViolations.length >= this.violationThreshold) {
      await this.escalateSecurityIncident(expertId, recentViolations);
    }
  }

  /**
   * Escalate security incident to Super Admin
   */
  async escalateSecurityIncident(expertId, violations) {
    const expert = await Admin.findById(expertId);

    // Create security alert
    await SecurityAlert.create({
      type: 'vip_expert_isolation_violation',
      severity: 'high',
      expertId,
      expertEmail: expert.email,
      violationCount: violations.length,
      violations: violations.map(v => ({
        timestamp: v.timestamp,
        attemptedAccess: v.targetId,
        ipAddress: v.ipAddress
      }))
    });

    // Notify Super Admin and VIP Coordinator
    await notifyAdmins({
      roles: ['superAdmin', 'vipCoordinator'],
      subject: 'Security Alert: VIP Expert Isolation Violation',
      message: `VIP Expert ${expert.email} has attempted to access ${violations.length} unauthorized clients in the past hour.`,
      action: 'Review and potentially suspend expert account'
    });

    // Auto-suspend expert if violations exceed threshold
    if (violations.length >= 5) {
      await Admin.updateOne(
        { _id: expertId },
        {
          isActive: false,
          suspensionReason: 'Automatic suspension due to repeated isolation violations',
          suspendedAt: new Date()
        }
      );

      await notifyExpert({
        expertId,
        subject: 'Account Suspended',
        message: 'Your account has been suspended due to security violations. Please contact support.'
      });
    }
  }

  /**
   * Daily audit report
   */
  async generateDailyAuditReport() {
    const yesterday = new Date(Date.now() - 86400000);

    const violations = await AuditLog.find({
      action: 'unauthorized_access_attempt',
      adminRole: 'vipExpert',
      timestamp: { $gte: yesterday }
    });

    const expertViolations = {};
    violations.forEach(v => {
      expertViolations[v.adminId] = (expertViolations[v.adminId] || 0) + 1;
    });

    // Send report to Super Admin
    await sendDailySecurityReport({
      date: yesterday,
      totalViolations: violations.length,
      expertsInvolved: Object.keys(expertViolations).length,
      topOffenders: Object.entries(expertViolations)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    });
  }
}

// Initialize monitor
const securityMonitor = new VIPExpertSecurityMonitor();

// Run daily audit
schedule.scheduleJob('0 9 * * *', () => {
  securityMonitor.generateDailyAuditReport();
});
```

---

## Testing & Validation

### Unit Tests for Isolation

```javascript
describe('VIP Expert Data Isolation', () => {
  let expert, assignedClient, unassignedClient;

  beforeEach(async () => {
    // Create test data
    expert = await Admin.create({
      email: 'expert@test.com',
      role: 'vipExpert'
    });

    assignedClient = await User.create({
      email: 'assigned@test.com',
      subscription: 'vip'
    });

    unassignedClient = await User.create({
      email: 'unassigned@test.com',
      subscription: 'vip'
    });

    // Create assignment
    await VIPAssignment.create({
      expertId: expert._id,
      vipUserId: assignedClient._id,
      status: 'active'
    });
  });

  test('Expert can access assigned client', async () => {
    const service = new VIPExpertService(expert._id);
    const client = await service.getClient(assignedClient._id);

    expect(client).toBeDefined();
    expect(client._id).toEqual(assignedClient._id);
  });

  test('Expert CANNOT access unassigned client', async () => {
    const service = new VIPExpertService(expert._id);

    await expect(
      service.getClient(unassignedClient._id)
    ).rejects.toThrow('This client is not assigned to you');
  });

  test('Expert listing only shows assigned clients', async () => {
    const service = new VIPExpertService(expert._id);
    const clients = await service.getAssignedClients();

    expect(clients).toHaveLength(1);
    expect(clients[0]._id).toEqual(assignedClient._id);
  });

  test('Deactivated assignment revokes access', async () => {
    // Deactivate assignment
    await VIPAssignment.updateOne(
      { expertId: expert._id, vipUserId: assignedClient._id },
      { status: 'inactive' }
    );

    const service = new VIPExpertService(expert._id);

    await expect(
      service.getClient(assignedClient._id)
    ).rejects.toThrow('This client is not assigned to you');
  });

  test('Unauthorized access attempt is logged', async () => {
    const service = new VIPExpertService(expert._id);

    try {
      await service.getClient(unassignedClient._id);
    } catch (error) {
      // Expected to fail
    }

    const log = await AuditLog.findOne({
      action: 'unauthorized_access_attempt',
      adminId: expert._id,
      targetId: unassignedClient._id
    });

    expect(log).toBeDefined();
  });
});
```

### Integration Tests

```javascript
describe('VIP Expert API Isolation', () => {
  let expertToken, assignedClientId, unassignedClientId;

  beforeEach(async () => {
    // Setup test data and get auth token
    expertToken = await createTestExpertAndGetToken();
    assignedClientId = await createAssignedClient();
    unassignedClientId = await createUnassignedClient();
  });

  test('GET /clients returns only assigned clients', async () => {
    const response = await request(app)
      .get('/admin/vip-expert/clients')
      .set('Authorization', `Bearer ${expertToken}`);

    expect(response.status).toBe(200);
    expect(response.body.clients).toHaveLength(1);
    expect(response.body.clients[0].id).toBe(assignedClientId);
  });

  test('GET /clients/:id succeeds for assigned client', async () => {
    const response = await request(app)
      .get(`/admin/vip-expert/clients/${assignedClientId}`)
      .set('Authorization', `Bearer ${expertToken}`);

    expect(response.status).toBe(200);
    expect(response.body.client.id).toBe(assignedClientId);
  });

  test('GET /clients/:id fails for unassigned client', async () => {
    const response = await request(app)
      .get(`/admin/vip-expert/clients/${unassignedClientId}`)
      .set('Authorization', `Bearer ${expertToken}`);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Access Denied');
    expect(response.body.code).toBe('VIP_EXPERT_ISOLATION_VIOLATION');
  });

  test('Direct database ID guessing is prevented', async () => {
    // Attempt to access sequential IDs
    const attemptedIds = [
      unassignedClientId,
      'random_id_123',
      assignedClientId.slice(0, -1) + '9' // Modified ID
    ];

    for (const id of attemptedIds) {
      const response = await request(app)
        .get(`/admin/vip-expert/clients/${id}`)
        .set('Authorization', `Bearer ${expertToken}`);

      if (id !== assignedClientId) {
        expect(response.status).toBe(403);
      }
    }
  });
});
```

---

## Incident Response Plan

### VIP Expert Isolation Breach Response

**Severity: CRITICAL**

1. **Detection:** Isolation violation detected in audit logs
2. **Immediate Actions:**
   - Suspend expert account immediately
   - Revoke all active sessions
   - Lock all assigned clients temporarily
3. **Investigation:**
   - Review all audit logs for expert
   - Identify all unauthorized access attempts
   - Determine if data was exfiltrated
4. **Notification:**
   - Notify affected VIP clients
   - Notify Super Admin and legal team
   - File security incident report
5. **Remediation:**
   - Change all affected client passwords
   - Review and strengthen isolation checks
   - Terminate expert contract if breach confirmed
6. **Post-Incident:**
   - Conduct security review
   - Update isolation implementation
   - Retrain remaining experts

---

## Compliance & Legal

### Data Protection Compliance

- **GDPR Article 32:** Technical measures to ensure data security
- **NDPR Section 2.4:** Data security safeguards
- **Contractual Obligation:** VIP Experts sign NDAs with isolation clauses

### Expert Contract Clauses

```
SECTION 7: DATA ACCESS RESTRICTIONS

7.1 The Expert acknowledges that they will only have access to VIP clients
    explicitly assigned to them by the Platform.

7.2 The Expert agrees NOT to:
    (a) Attempt to access, view, or search for users not assigned to them
    (b) Share client information with other experts or third parties
    (c) Use client data for any purpose outside of matchmaking services
    (d) Bypass or circumvent data isolation security measures

7.3 Violation of data access restrictions will result in:
    (a) Immediate contract termination
    (b) Forfeiture of unpaid earnings
    (c) Legal action for breach of confidentiality
    (d) Potential criminal prosecution under data protection laws

7.4 The Platform monitors all data access and maintains audit logs for
    compliance and security purposes.
```

---

## Performance Considerations

### Query Optimization

```javascript
// Bad: Fetching all assignments on every request
async function checkAccess(expertId, clientId) {
  const assignments = await VIPAssignment.find({ expertId }); // Slow
  return assignments.some(a => a.vipUserId.toString() === clientId);
}

// Good: Direct query with indexes
async function checkAccess(expertId, clientId) {
  const assignment = await VIPAssignment.findOne({
    expertId,
    vipUserId: clientId,
    status: 'active'
  }); // Fast with compound index
  return !!assignment;
}
```

### Caching Assigned Client IDs

```javascript
/**
 * Cache expert assignments in Redis for fast access
 */
class AssignmentCache {
  constructor(redis) {
    this.redis = redis;
    this.ttl = 300; // 5 minutes
  }

  async getAssignedClientIds(expertId) {
    const cacheKey = `expert:${expertId}:assigned_clients`;

    // Try cache first
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Cache miss: fetch from database
    const assignments = await VIPAssignment.find({
      expertId,
      status: 'active'
    }).select('vipUserId');

    const clientIds = assignments.map(a => a.vipUserId.toString());

    // Store in cache
    await this.redis.setex(cacheKey, this.ttl, JSON.stringify(clientIds));

    return clientIds;
  }

  async invalidate(expertId) {
    const cacheKey = `expert:${expertId}:assigned_clients`;
    await this.redis.del(cacheKey);
  }
}
```

---

## Related Documentation

- [Admin Architecture](admin_architecture.md) - Overall admin system design
- [Admin Roles & Permissions](admin_roles_permissions.md) - Permission matrices
- [VIP Coordination](vip_coordination.md) - VIP management procedures
- [Security & Compliance](../Safety%20&%20Compliance/legal_compliance.md) - Security standards

---

**Document Owner:** Engineering Lead
**Security Owner:** Chief Technology Officer
**Legal Review:** Data Protection Officer
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-03-26 (Monthly - Security Critical)
