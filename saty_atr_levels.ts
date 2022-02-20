# Saty_ATR_Levels
# v2 By Saty Mahajan (2022)
# Author is not responsible for your trading using this script.
# Data provided in this script is not financial advice.
#
# Special thanks to Gabriel Viana.
# Based on my own ideas and ideas from Ripster, drippy2hard, 
# Adam Sliver, and others.
#
# Features:
# Shows DTR vs ATR for the day
# Shows 2 labels:
# - 25% of ATR sweet spot put trigger using previous close
# and -1 ATR bottom range value using previous close
# - 25% of ATR sweet spot call trigger using previous close
# and +1 ATR top range value using previous close
# Configuration:
# - ATR length
# - Sweet Spot Trigger Percentage (0 - 1)
# - Use of today's close in order to find levels for tomorrow.
# - Put trigger cloud
# - Call trigger cloud
# - +/-1 ATR from previous close white clouds

declare upper;

input ATR_Length = 14;
input sweet_spot_percentage = 0.25;
input use_todays_close = no;
input close_cloud_on = yes;
input put_trigger_cloud_on = yes;
input call_trigger_cloud_on = yes;
input top_range_cloud_on = yes;
input bottom_range_cloud_on = yes;

def prev_close = if use_todays_close then close(period = AggregationPeriod.DAY) else close(period = AggregationPeriod.DAY)[1];
def atr = WildersAverage(TrueRange(high(period = AggregationPeriod.DAY), close(period = AggregationPeriod.DAY), low(period = AggregationPeriod.DAY)), ATR_Length);
def todays_high = Highest(high(period = aggregationPeriod.DAY), 1);
def todays_low = Lowest(low(period = aggregationPeriod.DAY), 1);
def dtr = todays_high - todays_low;
def dtr_percent = Round((dtr / atr) * 100, 0);
def pt = prev_close - (sweet_spot_percentage * atr);
def ct = prev_close + (sweet_spot_percentage * atr);
def br = prev_close - atr;
def tr = prev_close + atr;

# Labels
AddLabel (yes, "DTR ($" + Round (dtr , 2) + ") is " + round (dtr_percent,0) + "% of ATR ($" + round (atr,2)+ ")   " , (if dtr_percent <= 70 then Color.GREEN else if dtr_percent >= 90 then Color.RED else Color.ORANGE));
AddLabel (yes, "Puts < $" + Round (pt, 2) + " | -1 ATR: $" +  Round (br, 2) + "   ", Color.ORANGE);
AddLabel (yes, "Calls > $" + Round (ct, 2) + " | +1 ATR: $" + Round (tr, 2) + "   ", Color.CYAN);

# Previous Close cloud
AddCloud(if close_cloud_on then prev_close else double.nan, (prev_close + 0.02), Color.WHITE, Color.WHITE);

# Put / Call trigger clouds
AddCloud(if put_trigger_cloud_on then pt else double.nan, (pt-(atr*0.01)), Color.ORANGE, Color.ORANGE); 
AddCloud(if call_trigger_cloud_on then ct else double.nan, (ct+(atr*0.01)), Color.CYAN, Color.CYAN); 

# +/- 1 ATR clouds
AddCloud(if bottom_range_cloud_on then br else double.nan, (br-(atr*0.01)), Color.WHITE, Color.WHITE); 
AddCloud(if top_range_cloud_on then tr else double.nan, (tr+(atr*0.01)), Color.WHITE, Color.WHITE); 
