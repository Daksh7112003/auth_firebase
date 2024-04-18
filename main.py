import sys
from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QApplication, QMainWindow,QDialog
from PyQt5.uic import loadUi

# Login page
class Login(QDialog):
    def __init__(self):
        super(Login, self).__init__()
        loadUi("loginauth.ui", self)
        self.pushButton.clicked.connect(self.loginfunction)

        self.lineEdit_2.setEchoMode(QtWidgets.QLineEdit.Password)

        self.pushButton_2.clicked.connect(self.gotocreate)








    def gotocreate(self):
        createacc=CreateAcc()
        widget.addWidget(createacc)

        widget.setCurrentIndex(widget.currentIndex()+1)


    def loginfunction(self):
        email = self.lineEdit.text()
        password = self.lineEdit_2.text()
        print("Successfully logged in with email:", email, "and password:", password)



class CreateAcc(QDialog):
    def __init__(self):
        super(CreateAcc,self).__init__()

        loadUi("signup_auth.ui",self)
        self.pushButton.clicked.connect(self.createaccfxn)




    def createaccfxn(self):

        email=self.lineEdit.text()

        if self.lineEdit_2.text()==self.lineEdit_3.text():
            password=self.lineEdit_2.text()

            print("Successfully signedup with email", email,"and Password" ,password)




        
        






if __name__ == "__main__":
    app = QApplication(sys.argv)


    mainwindow = Login()

    widget = QtWidgets.QStackedWidget()



    widget.addWidget(mainwindow)




    widget.setFixedWidth(480)
    widget.setFixedHeight(620)





    # Show the main window
    widget.show() 

    # Show the main window
    sys.exit(app.exec_())  
    
    
    
    # Start the application event loop and exit properly when done






















# import sys
# from PyQt5 import QtWidgets
# from PyQt5.QtWidgets import QApplication, QDialog
# from PyQt5.uic import loadUi

# # Login page
# class Login(QDialog):
#     def __init__(self):
#         super(Login, self).__init__()
#         loadUi("loginauth.ui", self)
#         self.pushButton.clicked.connect(self.loginfunction)
#         self.lineEdit_2.setEchoMode(QtWidgets.QLineEdit.Password)
#         self.pushButton_2.clicked.connect(self.gotocreate)

#     def gotocreate(self):
#         widget.setCurrentIndex(1)  # Switch to the Create Account page

#     def loginfunction(self):
#         email = self.lineEdit.text()
#         password = self.lineEdit_2.text()
#         print("Successfully logged in with email:", email, "and password:", password)


# # Create Account page
# class CreateAcc(QDialog):
#     def __init__(self):
#         super(CreateAcc,self).__init__()
#         loadUi("signup_auth.ui",self)
#         self.pushButton.clicked.connect(self.createaccfxn)

#     def createaccfxn(self):
#         email = self.lineEdit.text()
#         if self.lineEdit2.text() == self.lineEdit3.text():
#             password = self.lineEdit2.text()
#             print("Email:", email, "Password:", password)


# if __name__ == "__main__":
#     app = QApplication(sys.argv)

#     # Create instances of both Login and CreateAcc
#     login_page = Login()
#     create_acc_page = CreateAcc()

#     # Add both pages to the QStackedWidget
#     widget = QtWidgets.QStackedWidget()
#     widget.addWidget(login_page)
#     widget.addWidget(create_acc_page)

#     # Show the QStackedWidget containing both pages
#     widget.show()

#     sys.exit(app.exec_())
