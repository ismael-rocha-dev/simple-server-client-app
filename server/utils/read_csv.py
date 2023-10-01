import csv


def read_csv(file_path, row_number):
    with open(file_path, "r", newline="") as file:
        csv_reader = csv.reader(file)
        for i, row in enumerate(csv_reader):
            if i == row_number:
                return row
