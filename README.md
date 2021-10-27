# ILAMB-Feedback-Data

This repository contains the raw data from a community feedback form
which is available [here](https://www.ilamb.org/crowdsource/), last
collected in April, 2020. The form was used to collect expert opinions about which bias from a pair of models appears 'better'. We then use this information to create ratings based on Elo's algorithm and compare to ILAMB methods of scoring.

The file `analysis.py` contains a routine for reading the raw information found in `feedback_form_data.txt` and then computing the Elo ratings. This information is added to a `pandas` dataframe which also contains alternative scoring idea information, stored in `method_comparison_data.csv`. The python script will plot each variable's bias score against the Elo rating. The feedback form was administered online. These assets, including the images and html/javascript/css code is included in the `html` directory.
