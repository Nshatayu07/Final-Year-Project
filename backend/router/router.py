from flask import Blueprint
from controller.apicontroller import data_manager, get_student_number, get_single_student

router = Blueprint('router', __name__)

@router.route('/') 
def hello_world():
    return "🟢🟢 Connection Established 🟢🟢"

@router.route('/upload', methods=['POST'])
def upload_file():
    return data_manager()

@router.route('/rolllist', methods=['GET'])
def get_roll_list():
    return get_student_number()

@router.route('/student', methods=['GET'])
def get_student():
    return get_single_student()
