# Saty_ATR_Levels
# v2 By Saty Mahajan (2022)
# Author is not responsible for your trading using this script.
# Data provided in this script is not financial advice.
#
# Special thanks to Gabriel Viana.
# Based on my own ideas and ideas from drippy2hard, 
# Adam Sliver, and others.
#
# Features:
# Shows 2 labels:
# - 25% of ATR sweet spot put trigger using previous close
# - -1 ATR bottom range value using previous close
# - 25% of ATR sweet spot call trigger using previous close
# - +1 ATR top range value using previous close
# Configuration:
# - ATR length
# - Sweet Spot Trigger Percentage (0 - 1)
# - Use of today's close in order to find levels for tomorrow.
# - Put trigger cloud
# - Call trigger cloud
# - +/-1 ATR from previous close white clouds

input ATR_Length = 14;
input sweet_spot_percentage = 0.25;
input use_todays_close = no;
input put_trigger_cloud_on = yes;
input call_trigger_cloud_on = yes;
input top_range_cloud_on = yes;
input bottom_range_cloud_on = yes;

def prev_close = if use_todays_close then close(period = AggregationPeriod.DAY) else close(period = AggregationPeriod.DAY)[1];
def atr = WildersAverage(TrueRange(high(period = AggregationPeriod.DAY), close(period = AggregationPeriod.DAY), low(period = AggregationPeriod.DAY)), ATR_Length);
def pt = prev_close - (sweet_spot_percentage * atr);
def ct = prev_close + (sweet_spot_percentage * atr);
def br = prev_close - atr;
def tr = prev_close + atr;

# Labels
AddLabel (yes, "Puts < $" + Round (pt, 2) + " | -1 ATR: $" +  Round (br, 2) + "   ", Color.ORANGE);
AddLabel (yes, "Calls > $" + Round (ct, 2) + " | +1 ATR: $" + Round (tr, 2) + "   ", Color.CYAN);

# Put / Call trigger clouds
AddCloud(if put_trigger_cloud_on then pt else double.nan, (pt-(atr*0.01)), Color.ORANGE, Color.ORANGE); 
AddCloud(if call_trigger_cloud_on then ct else double.nan, (ct+(atr*0.01)), Color.CYAN, Color.CYAN); 

# +/- 1 ATR clouds
AddCloud(if bottom_range_cloud_on then br else double.nan, (br-(atr*0.01)), Color.WHITE, Color.WHITE); 
AddCloud(if top_range_cloud_on then tr else double.nan, (tr+(atr*0.01)), Color.WHITE, Color.WHITE); 
