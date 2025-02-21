"""
The purpose of this python script is to parse and clean up the data before pushing to database
"""

import io
import pathlib

import pandas as pd
import requests
from typing import Literal


def get_df_from_api(api_url: str) -> pd.DataFrame:
    """Gets .csv file from the respective api url and creates data frame.

    Args:
        api_url (str): The API url that has a CSV.

    Returns:
        pd.DataFrame: DataFrame of the csv file.
    """
    try:
        res = requests.get(api_url)
        res.raise_for_status()  # raise an error if the request is not successful

        data = res.text
        df = pd.read_csv(io.StringIO(data))

        return df
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return None
    except pd.errors.ParserError as e:
        print(f"Pandas parsing error: {e}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Trimming fields, etc.

    Args:
        df (pd.DataFrame): DataFrame to be cleaned.

    Returns:
        pd.DataFrame: Cleaned DataFrame.
    """
    # strip all string columns
    for col in df.select_dtypes(include="object").columns:
        df[col] = df[col].str.strip()

    return df


def get_budget_for_type(type: Literal["revenue", "operating"]) -> None:
    """Gets budget data for type given

    Args:
        type (Literal["revenue", "operating"]): The type of budget
    """
    if type not in ["revenue", "operating"]:
        raise Exception("Type must be of 'revenue' or 'operating'.")

    API_URL = "https://budget.roseville.ca.us/api/"

    print(f"Getting {type} budget CSV from API...")
    # get the df for the type
    df = get_df_from_api(API_URL + f"{type}_budget.csv")

    # clean revenue df
    df = clean_data(df)

    # output df to csv
    data_dir = pathlib.Path.cwd() / "public/data"

    if not data_dir.exists():
        raise FileNotFoundError(f"Path {data_dir} does not exist.")

    print(f"Writing {type} data to csv...")

    if type == "operating":
        df.to_csv(data_dir / "expense-data.csv")
    else:
        df.to_csv(data_dir / "revenue-data.csv")

    print("\nDone!")


def main():
    """Runtime function"""
    # get budget for both types
    get_budget_for_type("revenue")
    get_budget_for_type("operating")


if __name__ == "__main__":
    main()
