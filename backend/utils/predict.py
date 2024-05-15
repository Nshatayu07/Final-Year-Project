import ktrain

from utils.constants import model_path

class Predictor:
    def __init__(self):
        self.model = ktrain.load_predictor(model_path)
        
    def predict(self, questions):
        return self.model.predict(questions)
    
    