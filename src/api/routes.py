"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    JWTManager,
)
from flask_bcrypt import Bcrypt

api = Blueprint("api", __name__)
bcrypt = Bcrypt()
jwt = JWTManager()

# Allow CORS requests to this API
CORS(api)


@api.route("/users", methods=["POST"])
def sing_in_up():
    try:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        pw_hash = bcrypt.generate_password_hash(password).decode("utf-8")

        if not data or not name or not email or not password:
            return jsonify({"error": "data have to be complete"}), 400
        new_user = User(name=name, email=email, password=pw_hash)

        db.session.add(new_user)
        db.session.commit()

        print("lo logro? si feje lo logro !, otra voz:lo logro")

        response_body = {"name": name, "email": email, "password": password}
        return jsonify({"response": response_body}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@api.route("/login", methods=["POST"])
def log_in():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "data have to be complete"}), 400
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        user_password = user.password

        checking_password = bcrypt.check_password_hash(user_password, password)

        if not checking_password:
            return (
                jsonify({"error": "Contraseña incorrecta o usuario no existente"}),
                404,
            )

        access_token = create_access_token(identity=user.id)

        return (
            jsonify(
                {"access_token": access_token, "name": user.name, "email": user.email}
            ),
            200,
        )

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@api.route("/private", methods=["GET"])
@jwt_required()
def show_users():
    try:
        current_user = get_jwt_identity()
        users = list(map(lambda user: user.serialize(), User.query.all()))
        print(
            "aveces hago cosas maravillosas que ni yo me las imagino cuack cuak cuak!!!"
        )
        return jsonify({"users": users, "loggeb_by_user": current_user}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500
