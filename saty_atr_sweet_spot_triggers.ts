# Saty_ATR_Sweet_Spot_Triggers
# v2 By Saty Mahajan (2022)
#
# Based on ideas from Adam Sliver's video: 
# https://www.youtube.com/watch?v=-o0v9WfJ0e0
#
# Features:
# Shows 2 labels:
# - 25% of ATR sweet spot put trigger using previous close
# - 25% of ATR sweet spot call trigger using previous close
# Configuration:
# - ATR length
# - Sweet Spot Trigger Percentage (0 - 1)
# - Use of today's close in order to find levels for tomorrow.
# - Put trigger cloud
# - Call trigger cloud

input ATR_Length = 14;
input sweet_spot_percentage = 0.25;
input use_todays_close = no;
input put_trigger_cloud_on = no;
input call_trigger_cloud_on = no;

def prev_close = if use_todays_close then close(period = AggregationPeriod.DAY) else close(period = AggregationPeriod.DAY)[1];
def atr = WildersAverage(TrueRange(high(period = AggregationPeriod.DAY), close(period = AggregationPeriod.DAY), low(period = AggregationPeriod.DAY)), ATR_Length);
def pt = prev_close - (sweet_spot_percentage * atr);
def ct = prev_close + (sweet_spot_percentage * atr);

AddLabel (yes, "Puts < $" + Round (pt, 2) + "  ", Color.RED);
AddLabel (yes, "Calls > $" + Round (ct, 2) + "  ", Color.GREEN);

AddCloud(if put_trigger_cloud_on then pt else double.nan, (pt-(0.01*atr)), Color.RED, Color.RED); 
AddCloud(if call_trigger_cloud_on then ct else double.nan, (ct+(0.01*atr)), Color.GREEN, Color.GREEN); 
