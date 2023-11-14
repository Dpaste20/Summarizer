from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as palm

app = Flask(__name__)
CORS(app)

palm.configure(api_key="YOUR API KEY")

defaults = {
    'model': 'models/text-bison-001',
    'temperature': 0.7,
    'candidate_count': 1,
    'top_k': 40,
    'top_p': 0.95,
    'max_output_tokens': 1024,
}

@app.route('/api/home', methods=[ 'POST','GET'])
def return_home():
    try:
        data = request.get_json()
        text_to_summarize = data.get('text', '')

        prompt = f"{text_to_summarize}"

        response = palm.generate_text(**defaults, prompt=prompt)

        return jsonify({"message": response.result})
    except Exception as e:
        return jsonify({
            "error": str(e),
            "message 0001":"However,application works perfectly.Its does give this error , if you know how to fix it, please go ahead and fix it😕",
            "message 0002":"As always, remember 1st Rule Of Programming "
        }
        ), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)
