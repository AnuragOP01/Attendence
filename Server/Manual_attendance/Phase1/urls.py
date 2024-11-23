from django.urls import path

from Manual_attendance.Phase1.views import *

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('attendance/', AttendanceListCreateView.as_view(), name='attendance-list-create'),
    path('studentsall/', StudentRegistrationListCreateView.as_view(), name='student-registration-list-create'),
    path('uploadCsv/', UploadStudentRegistrationView.as_view(), name='upload-student-registration'),
]