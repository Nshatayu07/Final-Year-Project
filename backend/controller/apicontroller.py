from flask import Flask, request
from pymongo import MongoClient
import json
from utils.predict import Predictor

from model.model import StudentModel, TestModel
from utils.filehandler import FileHandler

staticmethod = StudentModel()
test = TestModel()

def data_manager():
    test_code = request.form.get('test_code')
    if not test.handle_test(test_code):
        return json.dumps({'status': 'error', 'message': 'Test already exists'}), 400

    file = request.files['file']
    questions, roll_numbers, marks = FileHandler(file)

    predictor = Predictor()
    labels = predictor.predict(questions)

    students = []
    for i in range(len(roll_numbers)):
        student = {'number': roll_numbers[i], 'marks': marks[roll_numbers[i]]}
        students.append(student)
    staticmethod.studethandler(students, labels)
    
    return json.dumps({'status': 'success'}), 200

def get_student_number():
    student_numbers = staticmethod.get_student_numbers()
    return json.dumps({'student_numbers': student_numbers}), 200
    
def get_single_student():
    student_number = request.args.get('number')
    student = staticmethod.get_student(student_number)
    return json.dumps(student), 200
