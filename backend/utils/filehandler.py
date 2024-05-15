import pandas as pd

def FileHandler(file):
    df = pd.read_csv(file)

    headers = list(df.columns)
    roll_numbers = headers[1:]
    
    data = df.values.tolist()
    questions = []
    for i in range(len(data)):
        questions.append(data[i][0])

    marks = {}
    for i in range(len(roll_numbers)):
        marks[roll_numbers[i]] = []
    for i in range(len(data)):
        for j in range(1, len(data[i])):
            marks[roll_numbers[j-1]].append(data[i][j])

    return questions, roll_numbers, marks