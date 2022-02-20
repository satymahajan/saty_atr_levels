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
input middle_upper_cloud_on = yes;
input middle_lower_cloud_on = yes;
input top_range_cloud_on = yes;
input bottom_range_cloud_on = yes;

def prev_close = if use_todays_close then close(period = AggregationPeriod.DAY) else close(period = AggregationPeriod.DAY)[1];
def atr = WildersAverage(TrueRange(high(period = AggregationPeriod.DAY), close(period = AggregationPeriod.DAY), low(period = AggregationPeriod.DAY)), ATR_Length);
def todays_high = Highest(high(period = AggregationPeriod.DAY), 1);
def todays_low = Lowest(low(period = AggregationPeriod.DAY), 1);
def dtr = todays_high - todays_low;
def dtr_percent = Round((dtr / atr) * 100, 0);
def pt = prev_close - (sweet_spot_percentage * atr);
def ct = prev_close + (sweet_spot_percentage * atr);
def br = prev_close - atr;
def tr = prev_close + atr;
def mbt = (pt + br) / 2;
def mtt = (ct + tr) / 2;

# Labels
AddLabel (yes, "DTR ($" + Round (dtr , 2) + ") is " + Round (dtr_percent, 0) + "% of ATR ($" + Round (atr, 2) + ")   " , (if dtr_percent <= 70 then Color.GREEN else if dtr_percent >= 90 then Color.RED else Color.ORANGE));
AddLabel (yes, "Puts < $" + Round (pt, 2) + " | -1 ATR: $" +  Round (br, 2) + "   ", Color.ORANGE);
AddLabel (yes, "Calls > $" + Round (ct, 2) + " | +1 ATR: $" + Round (tr, 2) + "   ", Color.CYAN);

def cloud_size = 0.0069;

# Previous Close cloud
AddCloud(if close_cloud_on then prev_close else Double.NaN, (prev_close + (atr * cloud_size)), Color.GRAY, Color.GRAY);

# Put / Call trigger clouds
AddCloud(if put_trigger_cloud_on then pt else Double.NaN, (pt - (atr * cloud_size)), Color.ORANGE, Color.ORANGE);
AddCloud(if call_trigger_cloud_on then ct else Double.NaN, (ct + (atr * cloud_size)), Color.CYAN, Color.CYAN); 

# Middle range  clouds
AddCloud(if middle_lower_cloud_on then mbt else double.nan, (mbt - (atr * cloud_size)), Color.GRAY, Color.GRAY);
AddCloud(if middle_upper_cloud_on then mtt else double.nan, (mtt + (atr * cloud_size)), Color.GRAY, Color.GRAY); 

# +/- 1 ATR clouds
AddCloud(if bottom_range_cloud_on then br else Double.NaN, (br - (atr * cloud_size)), Color.WHITE, Color.WHITE);
AddCloud(if top_range_cloud_on then tr else Double.NaN, (tr + (atr * cloud_size)), Color.WHITE, Color.WHITE);
 
