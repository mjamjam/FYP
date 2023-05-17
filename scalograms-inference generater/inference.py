from keras import models 
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
import os
def generate_inference(file):
    print(file)
    temp_name = os.path.basename(file)
    file_name = os.path.splitext(temp_name)[0]
    print(file_name)

    main_path = '/home/hira_masood/Desktop/EEG/inf/inference/scalograms'
    images_path = main_path + '/' + file_name + '/'
    inference_path = images_path + "inference.txt"

    path_to_model = '/home/hira_masood/Desktop/EEG/trained_model/convNextBase2/'
    ConvNeXt_modelRound2= models.load_model(path_to_model)
    print("Model load hogya")
    print(inference_path)
    # test_path = '/home/hira_masood/Desktop/EEG/Inference/505/'
    # Use the Image Data Generator to import the images from the dataset
    print(images_path)
    test_datagen = ImageDataGenerator(rescale = 1./255)
    test_batches = test_datagen.flow_from_directory(directory = images_path, target_size = (224, 224), batch_size = 8, class_mode="categorical", shuffle = False)
    with tf.device("/gpu:0"):
        ConvNeXt_modelRound2.evaluate(test_batches)
        ConvNeXt_model_predictions505 = ConvNeXt_modelRound2.predict(test_batches, verbose = 2)
        y_pred = np.argmax(ConvNeXt_model_predictions505, axis = 1)
        y_pred1=np.reshape(y_pred, (18,59))
        print(inference_path)
    with open(inference_path, "w") as f:
        print("Folder open hogya")
        for a in range(18):
            for b in range(59):
                if(y_pred1[a][b]==1):
                    print("Slowing Wave Abnormality at channel {0} at {1} seconds".format(a,b))
                    f.write("slowing {0} {1}\n".format(b,a))
                if(y_pred1[a][b]==2):
                    print("Spiked Wave Abnormality at channel {0} at {1} seconds".format(a,b))
                    f.write("spiked {0} {1}\n".format(b,a))
