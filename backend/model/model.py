from db.db import client

class StudentModel:
    def __init__(self):
        self.client = client
        self.db = client['student_db']
        self.collection = self.db['students']

    
    def add_student(self, student):
        if self.collection.find_one({'number': student['number']}):
            student_db = self.collection.find_one({'number': student['number']})
            output = student_db['output']
            new_output = student['output']
            for key in new_output:
                if key not in output:
                    output[key] = new_output[key]
                else:
                    output[key][0] += new_output[key][0]
                    output[key][1] += new_output[key][1]
                    output[key][2] += new_output[key][2]
            self.collection.update_one({'number': student['number']}, {'$set': {'output': output}})

        else:
            self.collection.insert_one(student)
    
    def studethandler(self, students, labels):

        print(len(labels))
        for i in range(len(students)):
            student = students[i]
            output = {}

            for j in range(len(labels)):
                label_name = labels[j]
                if label_name not in output:
                    output[label_name] = [0, 0, 0]
                output[label_name][0] += 1
                if student['marks'][j] == 1:
                    output[label_name][1] += 1
                else:
                    output[label_name][2] += 1
            student['output'] = output
            data = {
                'number': student['number'],
                'output': student['output']
            }
            self.add_student(data)

    def get_student_numbers(self):
        student_numbers = []
        for student in self.collection.find():
            student_numbers.append(student['number'])
        return student_numbers
    
    def get_student(self, student_number):
        student = self.collection.find_one({'number': student_number})
        student.pop('_id')
        new_output = {
            "number": student['number'],
            "total": {},
            "correct": {},
            "incorrect": {},
            "labels": list(student['output'].keys())
        }
        for key in student['output']:
            new_output['total'][key] = student['output'][key][0]
            new_output['correct'][key] = student['output'][key][1]
            new_output['incorrect'][key] = student['output'][key][2]

        return new_output
    

class TestModel:
    def __init__(self):
        self.client = client
        self.db = client['student_db']
        self.collection = self.db['test']

    def add_test(self, test_code):
        self.collection.insert_one({'test_code': test_code})

    def check_test(self, test):
        return self.collection.find_one({'test_code': test})
    
    def handle_test(self, test_code):
        if self.check_test(test_code):
            return False
        else:
            self.add_test(test_code)
            return True

