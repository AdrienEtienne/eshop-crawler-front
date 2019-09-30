import React from "react";
import Input from "reactstrap/lib/Input";
import { FormGroup, Label, Spinner } from "reactstrap";
import { Shop } from "../types";
import { default as Select } from "react-select";
import { kebabCase } from "lodash";

export default function GameFilter({
  countries,
  search,
  shops,
  isLoading,
  onSearchChange,
  onCountriesChange
}: {
  countries: string[];
  search: string;
  shops: Shop[];
  isLoading: boolean;
  onSearchChange: (value: string) => void;
  onCountriesChange: (values: string[]) => void;
}) {
  if (isLoading) {
    return (
      <div className="py-5 text-center">
        <Spinner color="light" />
      </div>
    );
  }

  return (
    <div>
      <Input
        type="text"
        name="search"
        id="search"
        placeholder="Search: Zelda, Mario, etc."
        onChange={e => onSearchChange(e.currentTarget.value)}
        value={search}
        className="mb-3"
      />

      <Select
        isMulti
        isSearchable
        className="text-dark mt-3 mb-3"
        options={shops}
        placeholder="Price for Countries..."
        getOptionLabel={shop => shop.country}
        getOptionValue={shop => shop.code}
        formatOptionLabel={shop => (
          <div className="d-flex align-items-center justify-content-between">
            <span className="font-weight-light">{shop.country}</span>
            <img
              src={`${process.env.PUBLIC_URL}/img/flags/${kebabCase(
                shop.country.toLowerCase()
              )}.svg`}
              alt={shop.country}
              style={{ width: 25 }}
              className="ml-1"
            />
          </div>
        )}
        onChange={(options: any) =>
          onCountriesChange(((options || []) as Shop[]).map(el => el.code))
        }
        value={shops.filter(shop => countries.includes(shop.code))}
      />

      <FormGroup check className="mb-3">
        <Label check>
          <Input type="checkbox" id="checkbox-salse" /> On Sales
        </Label>
      </FormGroup>
    </div>
  );
}
