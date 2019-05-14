import json
import os
import io
import numpy as np
from PIL import Image
import traceback

import keras
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing import image
from keras.models import load_model

import tensorflow as tf


img_width, img_height = 224, 224
test_datagen = ImageDataGenerator(rescale = 1./224)

dirname = os.path.dirname(__file__)
layout_model_file = os.path.join(dirname, 'weights/layout_vgg19_model.h5')
saved_model = load_model(layout_model_file)
saved_model._make_predict_function()
graph = tf.get_default_graph()
def predict(img_stream):
    try:
        img_file = io.BytesIO(img_stream)
        img = Image.open(img_file)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        img = img.resize((224, 224), Image.ANTIALIAS)
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = test_datagen.standardize(x)
        with graph.as_default():
            y = saved_model.predict(x, verbose=2)
            pred = np.argmax(y[0])
            confidence = np.max(y[0])
            classes_dict = {'4': 0, '6': 1}
            return list(classes_dict.keys())[list(classes_dict.values()).index(pred)]
        return None
    except Exception as e:
        traceback.print_exc()
        return {"status": "FAILED", "error_message": e}

