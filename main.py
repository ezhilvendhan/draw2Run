import os
import json
from flask import Flask, request, jsonify, abort, make_response
from flask import Markup, render_template, g, send_from_directory, send_file
from models.layout_predictor import predict as predict_layout
from models.chart_predictor import predict as predict_chart
from models.util import create_app

template_dir = os.path.abspath('web')
app = Flask(__name__, template_folder=template_dir, static_url_path=template_dir)

# Get hostname
cf_app_env = os.getenv('VCAP_APPLICATION')
if cf_app_env is not None:
    host = json.loads(cf_app_env)['application_uris'][0]
else:
    host = 'localhost'

@app.route('/static/<path:path>', methods=['GET'])
def serve_file_in_dir(path):
    if not os.path.isfile(os.path.join(template_dir, path)):
        path = os.path.join(path, 'index.html')
    return send_from_directory(template_dir, path)

# define routes
@app.route('/')
def home():
    return render_template('index.html', host=host)

@app.route('/predict', methods=["POST"])
def do_predict():
    layout_file = request.files['layout']
    layout = str(predict_layout(layout_file.read()))
    component_files = request.files.getlist('components')
    components = []
    for _comp in component_files:
        components.append(predict_chart(_comp.read()))
    result = {'layout': layout, 'components': components}
    zipped_app = create_app(result)
    return send_file(zipped_app, attachment_filename='og-demo-app.zip', as_attachment=True)

# run app
if __name__ == "__main__":
    if os.environ.get('VCAP_SERVICES') is None: # running locally
        PORT = 8080
        DEBUG = True
    else:                                       # running on CF
        PORT = int(os.getenv("PORT"))
        DEBUG = False

    app.run(host='0.0.0.0', port=PORT, debug=DEBUG)
