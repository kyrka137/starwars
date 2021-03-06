from flask import *

app = Flask(__name__)
app.secret_key = 'development key'


@app.route("/", methods=["GET", "POST"])
def home():
    return render_template("index.html")


if __name__ == "__app__":
    app.run(debug=True)