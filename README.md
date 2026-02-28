## MedQuotient - Medical Insurance Cost Predictor

A Flask-based web application that estimates annual medical insurance charges using a machine learning model trained on the insurance.csv dataset. The project combines a simple backend with a responsive, modern frontend to deliver instant premium estimates from user-provided information.

## Overview

This application predicts medical insurance costs based on demographic and lifestyle factors. Users enter a small set of details, and the system returns an estimated annual insurance charge calculated by a trained regression model.

The focus is on clarity, usability, and clean integration between machine learning and web technologies.

## Core Highlights

* Dataset-Based Prediction Uses the insurance.csv dataset, incorporating features such as age, BMI, smoking status, and region to estimate insurance charges.
* Model-Driven Inference : A trained machine learning pipeline preprocesses inputs and generates predictions in real time.
* Responsive User Interface : Clean layout with smooth animations and clear separation between input and results.
* Lightweight Architecture : Flask backend with minimal configuration and fast response times.

## Workflow

Input Stage :

Users provide the following details:
* Age
* Sex
* BMI
* Number of children
* Smoking status
* Region

Processing Stage :

Form data is sent to the Flask backend.
Inputs are preprocessed using scaling and one-hot encoding.
The trained regression model predicts the insurance charge.

Output Stage :

The estimated annual insurance cost is displayed in a dedicated results section with animated visual feedback for better readability.

## Technical Stack

* Backend: Flask, scikit-learn, Pandas
* Model: Random Forest Regression Pipeline
* Frontend: HTML, CSS (Tailwind), JavaScript
* Model Storage: Joblib

## Learning Outcomes

* Built a full-stack machine learning web application.
* Trained and deployed a regression model using real-world insurance data.
* Integrated preprocessing pipelines with live inference.
* Designed a responsive, user-friendly prediction interface.

## Contributions

Suggestions, issues, and pull requests are welcome. The goal is to improve model performance, interface clarity, and overall application robustness.

## License

This project is licensed under the MIT License – see the LICENSE file for details.
