import sys
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.uic import loadUi

# Login page
class Login(QMainWindow):
    def __init__(self):
        super(Login, self).__init__()
        loadUi("login.ui", self)
        self.pushButton.clicked.connect(self.loginfunction)

    def loginfunction(self):
        email = self.lineEdit.text()
        password = self.lineEdit_2.text()
        print("Successfully logged in with email:", email, "and password:", password)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    mainwindow = Login()
    mainwindow.show()  # Show the main window
    sys.exit(app.exec_())  # Start the application event loop and exit properly when done
