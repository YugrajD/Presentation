import { useMemo } from 'react';
import type { FilterState, CountyData, RegionSummary } from '../types';
import { MOCK_RECORDS, aggregateByCounty, generateRegionSummary } from '../data/mockData';

export function useFilteredData(filters: FilterState) {
  const countyData = useMemo(() => {
    return aggregateByCounty(MOCK_RECORDS, {
      cancerType: filters.cancerType,
      breed: filters.breed,
      sex: filters.sex,
    });
  }, [filters.cancerType, filters.breed, filters.sex]);

  const regionSummary = useMemo(() => {
    return generateRegionSummary(countyData);
  }, [countyData]);

  const rateRange = useMemo(() => {
    const rates = countyData.map(c => c.rate).filter(r => r > 0);
    return {
      min: Math.min(...rates),
      max: Math.max(...rates),
    };
  }, [countyData]);

  return {
    countyData,
    regionSummary,
    rateRange,
  };
}

export function useCountyDataMap(countyData: CountyData[]): Map<string, CountyData> {
  return useMemo(() => {
    const map = new Map<string, CountyData>();
    countyData.forEach(county => {
      map.set(county.county, county);
    });
    return map;
  }, [countyData]);
}
