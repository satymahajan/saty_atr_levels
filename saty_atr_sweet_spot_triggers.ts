# Saty_ATR_Sweet_Spot_Triggers
# v1 By Saty Mahajan (2022)
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

input ATR_Length = 14;
input sweet_spot_percentage = 0.25;
def prev_close = close(period = AggregationPeriod.DAY)[1];
def ATR = WildersAverage(TrueRange(high(period = AggregationPeriod.DAY), close(period = AggregationPeriod.DAY), low(period = AggregationPeriod.DAY)), ATR_Length);
def pt = prev_close - (sweet_spot_percentage * ATR);
def ct = prev_close + (sweet_spot_percentage * ATR);

AddLabel (yes, "Puts < $" + Round (pt, 2) + "  ", Color.RED);
AddLabel (yes, "Calls > $" + Round (ct, 2) + "  ", Color.GREEN);
