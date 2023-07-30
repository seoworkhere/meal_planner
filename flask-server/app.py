from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import openai
from scheduler import *
from recommendations import *
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())  # read local .env file

openai.api_key = os.environ['OPENAI_API_KEY']

app = Flask(__name__)
CORS(app)

genres = ['mexican', 'chinese']


@app.route('/genres', methods=['GET'])
def get_genres():
    return jsonify(genres)


@app.route('/get_plan', methods=['POST'])
async def get_plan():
    try:
        data = request.json
        print(data)
        meal_requirements = data.get('meal_requirements', {})

        if not meal_requirements:
            return jsonify({"error": "No meal requirements provided."}), 400

        print("User Sent : ", meal_requirements)

        sch = Schedulder(meal_requirements)
        json_data = await sch.planner()
        left_day = await sch.find_leftover_takeout()
        final_treats = await sch.find_treats()
        sch.dump()

        json_data = json_data[:-1] + "," + \
            left_day[1:-1] + "," + final_treats[1:]

        print(json_data)
        return json_data
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_genre_recommendation', methods=['POST'])
async def get_genre_recommendation():
    try:
        data = request.json
        user_genres = data.get('genres', {})
        print(user_genres)

        if not user_genres:
            return jsonify({"error": "No meal requirements provided."}), 400

        rec = GenreRecommendations(user_genres)
        json_data = await rec.get_more_genres()
        print(json_data)
        return json_data
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_meal_recommendation', methods=['POST'])
async def get_meal_recommendation():
    try:
        data = request.json
        user_meals = data.get('genres', {})
        print(user_meals)

        if not user_meals:
            return jsonify({"error": "No meal requirements provided."}), 400

        rec = MealRecommendations(user_meals)
        json_data = await rec.get_more_meals()
        print(json_data)
        return json_data
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
