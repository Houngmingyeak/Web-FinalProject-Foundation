module ecocam.project_chat_console {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.kordamp.bootstrapfx.core;

    opens ecocam.project_chat_console to javafx.fxml;
    exports ecocam.project_chat_console;
}