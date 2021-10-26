import os
import random
import numpy as np
import pandas as pd
import elo
import matplotlib.pyplot as plt

def ParseFeedbackFile(filename,df):
    """

    Parses the file containing the selections from the community
    feedback forms and then determines a Elo ranking of each
    variable. We apply the ranking on 100 shuffles of the question
    orders and report the mean Elo rating as well as the envelope of
    encountered values. The rating information is added to the input
    dataframe.

    """
    nv = 3   # number of variables
    nm = 20  # number of models
    ns = 100 # number of shuffles
    lines = open(filename).readlines()

    Elo = []
    for s in range(ns): # loop over shuffles
        
        random.shuffle(lines)
        R = [elo.Rating() for f in range(nv*nm)]
        for i,line in enumerate(lines): # loop over lines in file

            # sometimes ppl click the button without having selected any entries
            if "NaN" in line: continue

            # some records may lack a time at the end, append a -1
            if len(line.strip().split()) % 3 == 2: line = line.strip() + " -1"

            # parse the row of data
            s = np.asarray(line.strip().split(),dtype=int)[:-3].reshape((-1,3))
            for j in range(s.shape[0]): # loop over completed questions
                if s[j,2] == s[j,0]:
                    R[s[j,0]],R[s[j,1]] = elo.rate_1vs1(R[s[j,0]],R[s[j,1]])
                else:
                    R[s[j,1]],R[s[j,0]] = elo.rate_1vs1(R[s[j,1]],R[s[j,0]])

        # add to list of ratings, shuffle and repeat
        Elo.append([float(r) for r in R])

    # rating is the mean, also report out the envelope
    Elo = np.asarray(Elo)
    df['Elo rating mean'] = Elo.mean(axis=0)
    df['Elo rating min']  = Elo.min (axis=0)
    df['Elo rating max']  = Elo.max (axis=0)
    return df

if __name__ == "__main__":

    df = pd.read_csv('method_comparison_data.csv')
    df = ParseFeedbackFile('feedback_form_data.txt',df)
    for v,dfv in df.groupby('variable'):        
        ax = dfv.plot(x='Elo rating mean',y='bias score',kind='scatter')
        ax.set_title(v)
        plt.show()

