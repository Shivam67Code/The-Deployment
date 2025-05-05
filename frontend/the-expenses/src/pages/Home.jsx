import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import DashboardLayout from '../components/layouts/DashboardLayout';
import DateRangeFilter from '../components/Filters/DateRangeFilter';
import CustomBarChart from '../components/Charts/CustomBarChart';
const Home = () => {
  // Your existing state variables
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Add date range state
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  // Fetch dashboard data function
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Add date range params to the request if they exist
      const params = {};
      if (dateRange.startDate) params.startDate = dateRange.startDate;
      if (dateRange.endDate) params.endDate = dateRange.endDate;
      
      const response = await axiosInstance.get('/api/v1/dashboard', { params });
      console.log("Dashboard data structure:", response.data); // Add this
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch data on initial load and when date range changes
  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]); // Re-fetch when date range changes
  
  // Handler for date range filter
  const handleDateRangeChange = (newRange) => {
    console.log("Dashboard received new date range:", newRange); // Add this
    setDateRange(newRange);
  };

  return (
    <DashboardLayout activeMenu="dashboard">
      <div className="p-6">
        {/* Header with Date Range Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <DateRangeFilter onFilterChange={handleDateRangeChange} />
        </div>
        
        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <>
            {/* Dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Your stat cards */}
            </div>
            
            {/* Charts section */}
            <div className="card mb-8">
              <h2 className="text-lg font-semibold mb-4">Income vs Expenses</h2>
              {/* Pass the dateRange to your CustomBarChart */}
              <CustomBarChart 
                data={dashboardData?.chartData || []} 
                dateRange={dateRange}
                isLoading={isLoading}
              />
            </div>
            
            {/* Other dashboard sections */}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;