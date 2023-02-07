# Saty_ATR_Levels
# Copyright (C) 2022-2023 Saty Mahajan
# Author is not responsible for your trading using this script.
# Data provided in this script is not financial advice.
#
# Features:
# - Scalp, Day, Multiday, Swing, Position, Long-term trading modes
# - Range against ATR for each period
# - Put and call trigger idea levels
# - Intermediate levels
# - Full-range levels
# - Extension levels
# - Trend label based on the 8-21-34 Pivot Ribbon
#
# Special thanks to Gabriel Viana.
# Based on my own ideas and ideas from Ripster, drippy2hard, 
# Adam Sliver, and others.

input trading_type = {"Scalp", default "Day", "Multiday", "Swing", "Position", "Long-term"};
input show_all_fibonacci_levels = yes;
input show_extensions = no;
input use_options_labels = yes;
input atr_length = 14;
input trigger_percentage = 0.236;
input use_current_close = no;
input show_info = yes;
input fast_ema = 8;
input pivot_ema = 21;
input slow_ema = 34;

def trading_period;
switch (trading_type) {
case "Scalp":
    trading_period = AggregationPeriod.FOUR_HOURS;
case "Day":
    trading_period = AggregationPeriod.DAY;
case "Multiday":
    trading_period = AggregationPeriod.WEEK;
case "Swing":
    trading_period = AggregationPeriod.MONTH;
case "Position":
    trading_period = AggregationPeriod.QUARTER;
case "Long-term":
    trading_period = AggregationPeriod.YEAR;
}

# Trend
def price = close;
def fast_ema_value = MovAvgExponential(price, fast_ema);
def pivot_ema_value = MovAvgExponential(price, pivot_ema);
def slow_ema_value = MovAvgExponential(price, slow_ema);
def bullish = price >= fast_ema_value and fast_ema_value >= pivot_ema_value and pivot_ema_value >= slow_ema_value;
def bearish = price <= fast_ema_value and fast_ema_value <= pivot_ema_value and pivot_ema_value <= slow_ema_value;

# ATR Levels
def previous_close = close(period = trading_period)[if use_current_close then 0 else 1];
def atr = Round(WildersAverage(TrueRange(high(period = trading_period), close(period = trading_period), low(period = trading_period)), atr_length)[if use_current_close then 0 else 1], 2);
def period_high = Highest(high(period = trading_period), 1);
def period_low = Lowest(low(period = trading_period), 1);
def tr = period_high - period_low;
def tr_percent_of_atr = Round((tr / atr) * 100, 0);
def lower_trigger = previous_close - (trigger_percentage * atr);
def upper_trigger = previous_close + (trigger_percentage * atr);
def lower_0382 = previous_close - (atr * 0.382);
def upper_0382 = previous_close + (atr * 0.382);
def lower_0500 = previous_close - (atr * 0.5);
def upper_0500 = previous_close + (atr * 0.5);
def lower_0618 = previous_close - (atr * 0.618);
def upper_0618 = previous_close + (atr * 0.618);
def lower_0786 = previous_close - (atr * 0.786);
def upper_0786 = previous_close + (atr * 0.786);
def lower_1000 = previous_close - atr;
def upper_1000 = previous_close + atr;
def lower_1236 = (lower_1000) - (atr * 0.236);
def upper_1236 = (upper_1000) + (atr * 0.236);
def lower_1382 = (lower_1000) - (atr * 0.382);
def upper_1382 = (upper_1000) + (atr * 0.382);
def lower_1500 = (lower_1000) - (atr * 0.5);
def upper_1500 = (upper_1000) + (atr * 0.5);
def lower_1618 = (lower_1000) - (atr * 0.618);
def upper_1618 = (upper_1000) + (atr * 0.618);
def lower_1786 = (lower_1000) - (atr * 0.786);
def upper_1786 = (upper_1000) + (atr * 0.786);
def lower_2000 = lower_1000 - atr;
def upper_2000 = upper_1000 + atr;
def lower_2236 = (lower_2000) - (atr * 0.236);
def upper_2236 = (upper_2000) + (atr * 0.236);
def lower_2382 = (lower_2000) - (atr * 0.382);
def upper_2382 = (upper_2000) + (atr * 0.382);
def lower_2500 = (lower_2000) - (atr * 0.5);
def upper_2500 = (upper_2000) + (atr * 0.5);
def lower_2618 = (lower_2000) - (atr * 0.618);
def upper_2618 = (upper_2000) + (atr * 0.618);
def lower_2786 = (lower_2000) - (atr * 0.786);
def upper_2786 = (upper_2000) + (atr * 0.786);
def lower_3000 = lower_2000 - atr;
def upper_3000 = upper_2000 + atr;

plot close_level;
close_level = previous_close;
close_level.SetDefaultColor(Color.WHITE);
close_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_trigger_level;
lower_trigger_level = lower_trigger;
lower_trigger_level.SetDefaultColor(Color.ORANGE);
lower_trigger_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_trigger_level;
upper_trigger_level = upper_trigger;
upper_trigger_level.SetDefaultColor(Color.CYAN);
upper_trigger_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_0382_level;
lower_0382_level = if show_all_fibonacci_levels then lower_0382 else Double.NaN;
lower_0382_level.SetDefaultColor(Color.GRAY);
lower_0382_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_0382_level;
upper_0382_level = if show_all_fibonacci_levels then upper_0382 else Double.NaN;
upper_0382_level.SetDefaultColor(Color.GRAY);
upper_0382_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_0500_level;
lower_0500_level = if show_all_fibonacci_levels then lower_0500 else Double.NaN;
lower_0500_level.SetDefaultColor(Color.GRAY);
lower_0500_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_0500_level;
upper_0500_level = if show_all_fibonacci_levels then upper_0500 else Double.NaN;
upper_0500_level.SetDefaultColor(Color.GRAY);
upper_0500_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_0618_level;
lower_0618_level = lower_0618;
lower_0618_level.SetDefaultColor(Color.LIGHT_GRAY);
lower_0618_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_0618_level;
upper_0618_level = upper_0618;
upper_0618_level.SetDefaultColor(Color.LIGHT_GRAY);
upper_0618_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_0786_level;
lower_0786_level = if show_all_fibonacci_levels then lower_0786 else Double.NaN;
lower_0786_level.SetDefaultColor(Color.GRAY);
lower_0786_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_0786_level;
upper_0786_level = if show_all_fibonacci_levels then upper_0786 else Double.NaN;
upper_0786_level.SetDefaultColor(Color.GRAY);
upper_0786_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_1000_level;
lower_1000_level = lower_1000;
lower_1000_level.SetDefaultColor(Color.WHITE);
lower_1000_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_1000_level;
upper_1000_level = upper_1000;
upper_1000_level.SetDefaultColor(Color.WHITE);
upper_1000_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_1236_level;
lower_1236_level = if show_extensions then lower_1236 else Double.NaN;
lower_1236_level.SetDefaultColor(Color.GRAY);
lower_1236_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_1382_level;
lower_1382_level = if show_extensions and show_all_fibonacci_levels then lower_1382 else Double.NaN;
lower_1382_level.SetDefaultColor(Color.GRAY);
lower_1382_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_1500_level;
lower_1500_level = if show_extensions and show_all_fibonacci_levels then lower_1500 else Double.NaN;
lower_1500_level.SetDefaultColor(Color.GRAY);
lower_1500_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_1618_level;
lower_1618_level = if show_extensions then lower_1618 else Double.NaN;
lower_1618_level.SetDefaultColor(Color.LIGHT_GRAY);
lower_1618_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_1786_level;
lower_1786_level = if show_extensions and show_all_fibonacci_levels then lower_1786 else Double.NaN;
lower_1786_level.SetDefaultColor(Color.GRAY);
lower_1786_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_2000_level;
lower_2000_level = if show_extensions then lower_2000 else Double.NaN;
lower_2000_level.SetDefaultColor(Color.WHITE);
lower_2000_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_2236_level;
lower_2236_level = if show_extensions then lower_2236 else Double.NaN;
lower_2236_level.SetDefaultColor(Color.GRAY);
lower_2236_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_2382_level;
lower_2382_level = if show_extensions and show_all_fibonacci_levels then lower_2382 else Double.NaN;
lower_2382_level.SetDefaultColor(Color.GRAY);
lower_2382_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_2500_level;
lower_2500_level = if show_extensions and show_all_fibonacci_levels then lower_2500 else Double.NaN;
lower_2500_level.SetDefaultColor(Color.GRAY);
lower_2500_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_2618_level;
lower_2618_level = if show_extensions then lower_2618 else Double.NaN;
lower_2618_level.SetDefaultColor(Color.LIGHT_GRAY);
lower_2618_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_2786_level;
lower_2786_level = if show_extensions and show_all_fibonacci_levels then lower_2786 else Double.NaN;
lower_2786_level.SetDefaultColor(Color.GRAY);
lower_2786_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot lower_3000_level;
lower_3000_level = if show_extensions then lower_3000 else Double.NaN;
lower_3000_level.SetDefaultColor(Color.WHITE);
lower_3000_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_1236_level;
upper_1236_level = if show_extensions then upper_1236 else Double.NaN;
upper_1236_level.SetDefaultColor(Color.GRAY);
upper_1236_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_1382_level;
upper_1382_level = if show_extensions and show_all_fibonacci_levels then upper_1382 else Double.NaN;
upper_1382_level.SetDefaultColor(Color.GRAY);
upper_1382_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_1500_level;
upper_1500_level = if show_extensions and show_all_fibonacci_levels then upper_1500 else Double.NaN;
upper_1500_level.SetDefaultColor(Color.GRAY);
upper_1500_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_1618_level;
upper_1618_level = if show_extensions then upper_1618 else Double.NaN;
upper_1618_level.SetDefaultColor(Color.LIGHT_GRAY);
upper_1618_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_1786_level;
upper_1786_level = if show_extensions and show_all_fibonacci_levels then upper_1786 else Double.NaN;
upper_1786_level.SetDefaultColor(Color.GRAY);
upper_1786_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_2000_level;
upper_2000_level = if show_extensions then upper_2000 else Double.NaN;
upper_2000_level.SetDefaultColor(Color.WHITE);
upper_2000_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_2236_level;
upper_2236_level = if show_extensions then upper_2236 else Double.NaN;
upper_2236_level.SetDefaultColor(Color.GRAY);
upper_2236_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_2382_level;
upper_2382_level = if show_extensions and show_all_fibonacci_levels then upper_2382 else Double.NaN;
upper_2382_level.SetDefaultColor(Color.GRAY);
upper_2382_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_2500_level;
upper_2500_level = if show_extensions and show_all_fibonacci_levels then upper_2500 else Double.NaN;
upper_2500_level.SetDefaultColor(Color.GRAY);
upper_2500_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_2618_level;
upper_2618_level = if show_extensions then upper_2618 else Double.NaN;
upper_2618_level.SetDefaultColor(Color.LIGHT_GRAY);
upper_2618_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_2786_level;
upper_2786_level = if show_extensions and show_all_fibonacci_levels then upper_2786 else Double.NaN;
upper_2786_level.SetDefaultColor(Color.GRAY);
upper_2786_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot upper_3000_level;
upper_3000_level = if show_extensions then upper_3000 else Double.NaN;
upper_3000_level.SetDefaultColor(Color.WHITE);
upper_3000_level.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

def rangeNotAvailable = IsNaN(tr);
def atrNotAvailable = IsNaN(atr);

DefineGlobalColor("Long Label", Color.CYAN);
DefineGlobalColor("Short Label", Color.ORANGE);

# Labels
AddLabel(show_info, "Saty ATR Levels ", if bullish then Color.GREEN else if bearish then Color.RED else Color.ORANGE);
AddLabel (show_info, (if trading_period == AggregationPeriod.YEAR then "Long-term " else if trading_period == AggregationPeriod.QUARTER then "Position "  else if trading_period == AggregationPeriod.MONTH then "Swing " else if trading_period == AggregationPeriod.WEEK then "Multiday " else if trading_period == AggregationPeriod.FOUR_HOURS then "Scalp " else "Day ") + (if (rangeNotAvailable) then "Range N/A Pre-Market" + " | ATR ($" + Round (atr, 2) + ")   " else if (atrNotAvailable) then " Range - Not Enough Data" else "Range ($" + Round (tr , 2) + ") is " + Round (tr_percent_of_atr, 0) + "% of ATR ($" + Round (atr, 2) + ")   ") , (if (rangeNotAvailable or atrNotAvailable) then Color.GRAY else (if tr_percent_of_atr <= 70 then Color.GREEN else if tr_percent_of_atr >= 90 then Color.RED else Color.ORANGE)));
AddLabel (show_info, (if use_options_labels then "Calls" else "Long") + " > $" + Round (upper_trigger, 2) + " | +1 ATR: $" + Round (upper_1000, 2) + "   ", GlobalColor("Long Label"));
AddLabel (show_info, (if use_options_labels then "Puts" else "Short") + " < $" + Round (lower_trigger, 2) + " | -1 ATR: $" +  Round (lower_1000, 2) + "   ", GlobalColor("Short Label"));
