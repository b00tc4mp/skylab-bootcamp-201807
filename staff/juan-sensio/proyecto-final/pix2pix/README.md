# Pix2Pix

This is a list of some tools to edit video, train pix2pix and export the model to be used in the pose2pose app.

### Resize video to 512x256

```bash
ffmpeg -i input.mp4 -vf scale=512:256 -c:a copy output.mp4
```

### Split video in frames

```bash
rm -r frames/*
ffmpeg -i input.mp4 -f image2 frames/img-%04d.png
```

### Split in train and test 

```bash
python3 tools/split.py --dir frames
```

### Train 

```bash
python3 pix2pix.py --mode train --output_dir train --max_epochs 200 --input_dir frames/train --which_direction BtoA
```

### Test

```bash
rm -r test/*
python3 pix2pix.py --mode test --output_dir test --input_dir frames/val --checkpoint train
```

### Export model 

```bash
python3 pix2pix.py --mode export --output_dir export --checkpoint train --which_direction BtoA
```

### Convert model to tensorflow.js

```bash
python3 tools/export-checkpoint.py --checkpoint export --output_file models/david_BtoA.pict
```

## MISC 

### Cut a video

```bash
ffmpeg -i fornite.mp4 -ss 121 -t 29 -c:a copy fortnite2.mp4
```

### Crop a video

```bash
ffmpeg -i fortnite1.mp4 -filter:v "crop=1280:690:0:30" -c:a copy fortnite1_crop.mp4
```

## References

https://github.com/affinelayer/pix2pix-tensorflow

https://github.com/yining1023/pix2pix_tensorflowjs