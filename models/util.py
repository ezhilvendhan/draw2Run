import io
import StringIO
import os
import requests
import zipfile

app_template_dir = os.path.abspath('web/static/app')

def create_app(layout):
    print str(layout)
    # get html from API
    response = requests.post("https://og-layout-ai-dev.run.aws-usw02-pr.ice.predix.io/layout",
            json = layout)
    inmemory_file = io.BytesIO()
    with zipfile.ZipFile(inmemory_file, mode='w') as zip_file:
        append_dir(app_template_dir, zip_file)
        print(str(response.content))
        zip_file.writestr("public/elements/views/dashboard-layout/dashboard-layout-view.html", 
            str(response.content))
        zip_file.printdir()
    inmemory_file.seek(0)
    return inmemory_file


def append_dir(path, zip_file):
    for file in os.listdir(path):
        full_path = os.path.join(path, file)
        if os.path.isfile(full_path):
            arc_name = full_path.replace(app_template_dir+"/", "")
            zip_file.write(full_path, arc_name)
        elif os.path.isdir(full_path):
            append_dir(full_path, zip_file)
    return zip_file

