import unittest
import tempfile
import shutil
import os
from unittest.mock import patch
from keras import models
import tensorflow as tf
import numpy as np

class InferenceGenerationTestCase(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.mkdtemp()
        self.valid_image_file = os.path.join(self.temp_dir, 'valid_image.jpg')
        open(self.valid_image_file, 'a').close()
        self.invalid_image_file = os.path.join(self.temp_dir, 'invalid_image.jpg')
        self.images_path = os.path.join(self.temp_dir, 'images')
        os.mkdir(self.images_path)
        self.model_path = os.path.join(self.temp_dir, 'model.h5')
        self.inference_path = os.path.join(self.images_path, 'inference.txt')


class ImageGenerationTestCase(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.mkdtemp()
        self.image_file = os.path.join(self.temp_dir, 'test_image.edf')
        open(self.image_file, 'a').close()

    def tearDown(self):
        shutil.rmtree(self.temp_dir)

    def test_image_generation(self):
        generate_images(self.image_file)
        generated_images = glob.glob(os.path.join(self.temp_dir, '*.png'))
        self.assertGreater(len(generated_images), 0)
        for image_path in generated_images:
            with Image.open(image_path) as img:
                self.assertEqual(img.size, (224, 224))
                self.assertEqual(img.mode, 'RGB')

'''This test case ensures that the generate_images function is generating 
images of the correct size and format. It checks if the generated images have
 a size of 224x224 pixels and are in RGB mode. It also verifies that at least one image is generated.'''



class StreamlitAppTestCase(unittest.TestCase):
    def setUp(self):
        # Create a Streamlit client for testing
        self.client = MagicMock()

    def test_app(self):
        # Set the file to be uploaded
        file_data = BytesIO(b'file_content')
        file_data.name = 'test.edf'

        # Patch the file uploader to return the test file
        with patch.object(st, 'file_uploader', return_value=file_data):
            # Run the Streamlit app
            app()

        # Assert that the expected Streamlit functions are called
        self.client.title.assert_called_with('EDF to Scalograms')
        self.client.file_uploader.assert_called_with('Upload an EDF file', type='edf')
        self.client.info.assert_called_with('Please upload an EDF file')

        # Assert that the images are generated when the button is clicked
        self.client.button.return_value = True
        with patch.object(st, 'file_uploader', return_value=file_data):
            # Run the Streamlit app
            app()

        # Assert that the expected Streamlit functions are called
        self.client.warning.assert_called_with('Please upload an EDF file')
        self.client.write.assert_called_with('Images generated successfully')

# The test_app method simulates the interactions with the Streamlit app and asserts 
# that the expected Streamlit functions are called with the correct arguments.
