from flask import Flask
from router.router import router
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
app.register_blueprint(router)

if __name__ == '__main__':
    print("🟢🟢 Server Started 🟢🟢")
    app.run(debug=False, port=5000)