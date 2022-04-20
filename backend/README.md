# SETUP
1. Install the requirements.txt using whatever method you would like. (conda, pip, etc)
2. Download git submodules using `git submodule update --init --recursive`
3. Save w2v model file from `https://drive.google.com/uc?export=download&id=1OPn9puJ67qApyFQ7aIUfBeN0MW1fEqfe` inside backend directory 
4. Save bert model DIRECTORY `casedbertbase_w2v768sum_silu_50eps_seed42_labeled` from `https://drive.google.com/drive/folders/16v-xz-IHzthTfUhZWmmK664HLRGdiXzE` as `model` inside backend directory
5. $ `sh start_server.sh` from the backend directory