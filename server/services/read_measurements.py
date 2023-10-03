import time
import math
from utils.read_csv import read_csv

last_time = time.time()
current_row_number = 0
seconds_between_measurements = 1


def read_measurements():
    global current_row_number
    global last_time

    current_time = time.time()
    time_elapsed_since_last_measurement = current_time - last_time

    power_generation_total_sum_15_minutes = 0.0

    if time_elapsed_since_last_measurement < seconds_between_measurements:
        pass
    else:
        current_row_number += math.floor(
            time_elapsed_since_last_measurement / seconds_between_measurements
        )
        last_time = current_time

        for i in range(15):
            row_number = current_row_number * 15 + i

            power_generation_data_1_minute = read_csv(
                "data/power_generation.csv", row_number
            )

            power_generation_total_sum_15_minutes += float(
                power_generation_data_1_minute[1]
            )

    consumption_data_15_minutes = read_csv(
        "data/power_consumption.csv", current_row_number
    )

    return {
        "date": consumption_data_15_minutes[0],
        "consumption_measurements": [
            float(value) for value in consumption_data_15_minutes[1:]
        ],
        "generation_measurements": [round(power_generation_total_sum_15_minutes, 2)],
    }
