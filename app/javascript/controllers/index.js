import { application } from "controllers/application"

import AccordionController from "controllers/accordion_controller"
import CharacterCountController from "controllers/character_count_controller"
import CollapsibleController from "controllers/collapsible_controller"
import DismissibleController from "controllers/dismissible_controller"
import DrawerController from "controllers/drawer_controller"
import DropdownController from "controllers/dropdown_controller"
import FileUploadController from "controllers/file_upload_controller"
import ModalController from "controllers/modal_controller"
import SearchController from "controllers/search_controller"
import SliderController from "controllers/slider_controller"
import SwitchController from "controllers/switch_controller"
import TabsController from "controllers/tabs_controller"
import TagInputController from "controllers/tag_input_controller"
import ToastController from "controllers/toast_controller"
import TooltipController from "controllers/tooltip_controller"
import SignupFormController from "controllers/signup_form_controller"
import PasswordVisibilityController from "controllers/password_visibility_controller"

application.register("accordion", AccordionController)
application.register("character-count", CharacterCountController)
application.register("collapsible", CollapsibleController)
application.register("dismissible", DismissibleController)
application.register("drawer", DrawerController)
application.register("dropdown", DropdownController)
application.register("file-upload", FileUploadController)
application.register("modal", ModalController)
application.register("search", SearchController)
application.register("slider", SliderController)
application.register("switch", SwitchController)
application.register("tabs", TabsController)
application.register("tag-input", TagInputController)
application.register("toast", ToastController)
application.register("tooltip", TooltipController)
application.register("signup-form", SignupFormController)
application.register("password-visibility", PasswordVisibilityController)
