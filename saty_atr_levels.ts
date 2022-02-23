# Saty_ATR_Levels
# Copyright (C) 2022 Saty Mahajan
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
# - 23.6% of ATR put trigger using previous close
# and -1 ATR bottom range value using previous close
# - 23.6% of ATR call trigger using previous close
# and +1 ATR top range value using previous close
# Configuration:
# - ATR length
# - Sweet Spot Trigger Percentage (0 - 1)
# - Use of today's close in order to find levels for tomorrow.
# - Put trigger cloud
# - Call trigger cloud
# - +/- Midrange cloud (defaults to 61.8 fib when using default trigger value
# - +/-1 ATR from previous close white clouds

input atr_Length = 14;
input trigger_percentage = 0.236;
input use_todays_close = no;
input close_cloud_on = yes;
input lower_trigger_cloud_on = yes;
input lower_middle_cloud_on = yes;
input lower_atr_cloud_on = yes;
input upper_trigger_cloud_on = yes;
input upper_middle_cloud_on = yes;
input upper_atr_cloud_on = yes;

def previous_close = if use_todays_close then close(period = AggregationPeriod.DAY) else close(period = AggregationPeriod.DAY)[1];
def atr = WildersAverage(TrueRange(high(period = AggregationPeriod.DAY), close(period = AggregationPeriod.DAY), low(period = AggregationPeriod.DAY)), atr_Length);
def todays_high = Highest(high(period = AggregationPeriod.DAY), 1);
def todays_low = Lowest(low(period = AggregationPeriod.DAY), 1);
def dtr = todays_high - todays_low;
def dtr_percent_of_atr = Round((dtr / atr) * 100, 0);
def lower_trigger = previous_close - (trigger_percentage * atr);
def upper_trigger = previous_close + (trigger_percentage * atr);
def lower_atr = previous_close - atr;
def upper_atr = previous_close + atr;
def lower_middle = (lower_trigger + lower_atr) / 2;
def upper_middle = (upper_trigger + upper_atr) / 2;

# Labels
AddLabel (yes, "DTR ($" + Round (dtr , 2) + ") is " + Round (dtr_percent_of_atr, 0) + "% of ATR ($" + Round (atr, 2) + ")   " , (if dtr_percent_of_atr <= 70 then Color.GREEN else if dtr_percent_of_atr >= 90 then Color.RED else Color.ORANGE));
AddLabel (yes, "Puts < $" + Round (lower_trigger, 2) + " | -1 ATR: $" +  Round (lower_atr, 2) + "   ", Color.ORANGE);
AddLabel (yes, "Calls > $" + Round (upper_trigger, 2) + " | +1 ATR: $" + Round (upper_atr, 2) + "   ", Color.CYAN);

def cloud_size = 0.01;

# Previous Close cloud
AddCloud(if close_cloud_on then (previous_close - (atr * cloud_size / 2)) else Double.NaN, (previous_close + (atr * cloud_size / 2)), Color.WHITE, Color.WHITE);

# Trigger clouds
AddCloud(if lower_trigger_cloud_on then lower_trigger else Double.NaN, (lower_trigger - (atr * cloud_size)), Color.ORANGE, Color.ORANGE);
AddCloud(if upper_trigger_cloud_on then upper_trigger else Double.NaN, (upper_trigger + (atr * cloud_size)), Color.CYAN, Color.CYAN); 

# Middle clouds
AddCloud(if lower_middle_cloud_on then lower_middle else double.nan, (lower_middle - (atr * cloud_size)), Color.GRAY, Color.GRAY);
AddCloud(if upper_middle_cloud_on then upper_middle else double.nan, (upper_middle + (atr * cloud_size)), Color.GRAY, Color.GRAY); 

# +/- 1 ATR clouds
AddCloud(if lower_atr_cloud_on then lower_atr else Double.NaN, (lower_atr - (atr * cloud_size)), Color.WHITE, Color.WHITE);
AddCloud(if upper_atr_cloud_on then upper_atr else Double.NaN, (upper_atr + (atr * cloud_size)), Color.WHITE, Color.WHITE);
 
