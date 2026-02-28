class Rack::Attack
  # Throttle login attempts by IP
  throttle("logins/ip", limit: 5, period: 20.seconds) do |req|
    req.ip if req.path == "/session" && req.post?
  end

  # Throttle sign-up attempts by IP
  throttle("signups/ip", limit: 3, period: 1.hour) do |req|
    req.ip if req.path == "/users" && req.post?
  end

  # Throttle password reset requests by email
  throttle("password_resets/email", limit: 3, period: 1.hour) do |req|
    if req.path == "/passwords" && req.post?
      req.params.dig("user", "email").to_s.downcase.strip
    end
  end

  # Block requests with suspicious user agents
  blocklist("block bad user agents") do |req|
    req.user_agent&.match?(/masscan|zgrab|nikto|sqlmap/i)
  end

  # Return 429 for throttled requests
  self.throttled_responder = lambda do |request|
    match_data = request.env["rack.attack.match_data"]
    now        = match_data[:epoch_time]
    retry_after = match_data[:period] - (now % match_data[:period])

    [
      429,
      {
        "Content-Type"  => "application/json",
        "Retry-After"   => retry_after.to_s
      },
      [ { error: "Too many requests. Please try again later." }.to_json ]
    ]
  end
end
