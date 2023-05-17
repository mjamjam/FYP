import numpy as np
from PIL import Image
import itertools
import os
import shutil
import random
import glob
import matplotlib.pyplot as plt
import pandas as pd
import mne
import pywt
from tqdm import tqdm
import gc
import tensorflow as tf
tf.config.list_physical_devices('gpu')
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))
print(tf.config.list_physical_devices("GPU"))



# generate random integer values
from random import seed
from random import randint

def generate_images(file):
    temp_name = os.path.basename(file)
    file_name = os.path.splitext(temp_name)[0]



    #%matplotlib inline
    plt.rcParams['figure.dpi'] = 100
    plt.rcParams['figure.figsize'] = [224/100,224/100]
    scales = np.arange(1,24)        # CWT SCALE

    #all_files_dir = 'E:/FYP/raw_data/edf/EDF Files/'     #Path to all normal EDF files
    # all_files_dir = r'C:\Users\user\Desktop\fypp\SampleEdf'     #Path to all normal EDF files
    # #main_path = 'E:/FYP/imgsss' # Path to save all the CWT Normal images
    main_path = '/home/hira_masood/Desktop/EEG/inf/inference/scalograms' # Path to save all the CWT Normal images
    # file_path = main_path + temp_name

    image_path = main_path + '/' + file_name

    # use the mkdir() method to create the new directory
    try:
        os.mkdir(image_path)
        image_path = image_path+'/'+ 'batch'
        os.mkdir(image_path)
    except OSError as e:
        print(f"Error: {e}")

    random.seed(444)     #Make sure the seed is same to get similar results
    window_num = 451    #Define the number of windows you want per normal file

    # win_ch = int(window_num/19)
    coef_data = np.empty((2,19))
    raw = mne.io.read_raw_edf(file,preload = True,exclude = ['A1','A2'])     # Importing all EEG Channels, exculding A1 A2 since matlab has already refrenced the channels with A1 and A2
    raw=raw.crop(tmin=0, tmax=60, include_tmax= True)
    window_num = int(raw.times[-1])
    
    print("The window num is:" ,window_num)
    win_ch = int(window_num/19)
    
    
    raw.filter(l_freq=0.5,h_freq=45,fir_window='hamming')      # Bandpass filtering [1-45] Hz
    full_data = raw.get_data()
    epochs=mne.make_fixed_length_epochs(raw,duration=2,overlap=1)
    epochs_data=epochs.get_data()  
    print('Shape of input data after Epochs:',epochs_data.shape)

    for i in range(18):
        coef,_ = pywt.cwt(full_data[i], scales,'mexh',method = 'conv')
        #for j in range(win_ch):
        for j in range(window_num-1):
            #rand_num = randint(0,epochs_data.shape[0]-1)
            # sig_cwt,_ = pywt.cwt(epochs_data[rand_num][i], scales , 'mexh',method = 'conv')
            sig_cwt,_ = pywt.cwt(epochs_data[j][i], scales , 'mexh',method = 'conv')
            plt.imshow(sig_cwt, extent=[-1, 1, 31, 1], cmap='nipy_spectral', aspect='auto',vmax=abs(coef).max(), vmin=-abs(coef).max())
            plt.axis('off')
            
            plt.savefig(fname = image_path + '/' + 'img_' + str(i) + '_' + str(j) + '_' + str(file[:-4]) + '.png', bbox_inches = 'tight')

            plt.close()
    collected = gc.collect()
    print('Gc collect',collected)
    print('-----------------------------------------------')
    print('-----------------------------------------------')
