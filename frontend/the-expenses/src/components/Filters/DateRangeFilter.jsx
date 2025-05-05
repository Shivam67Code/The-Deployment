import React, { useState, useEffect, useRef } from 'react';
import { LuCalendar, LuChevronDown, LuCheck } from 'react-icons/lu';
import moment from 'moment';

const DateRangeFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('all');
  const [customRange, setCustomRange] = useState({
    startDate: '',
    endDate: moment().format('YYYY-MM-DD')
  });
  const [dateRangeText, setDateRangeText] = useState('All Transactions');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filterOptions = [
    { id: 'all', label: 'All Transactions' },
    { id: 'last15', label: 'Last 15 Days' },
    { id: 'last25', label: 'Last 25 Days' },
    { id: 'thisMonth', label: 'This Month' },
    { id: 'thisYear', label: 'This Year' },
    { id: 'custom', label: 'Custom Range' }
  ];

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    
    if (optionId !== 'custom') {
      setIsOpen(false);
    }

    let dateRange = {};
    const today = moment().endOf('day');

    switch (optionId) {
      case 'all':
        dateRange = { startDate: '', endDate: '' };
        setDateRangeText('All Transactions');
        break;
      case 'last15':
        dateRange = {
          startDate: moment().subtract(15, 'days').startOf('day').format('YYYY-MM-DD'),
          endDate: today.format('YYYY-MM-DD')
        };
        setDateRangeText('Last 15 Days');
        break;
      case 'last25':
        dateRange = {
          startDate: moment().subtract(25, 'days').startOf('day').format('YYYY-MM-DD'),
          endDate: today.format('YYYY-MM-DD')
        };
        setDateRangeText('Last 25 Days');
        break;
      case 'thisMonth':
        dateRange = {
          startDate: moment().startOf('month').format('YYYY-MM-DD'),
          endDate: moment().endOf('month').format('YYYY-MM-DD')
        };
        setDateRangeText('This Month');
        break;
      case 'thisYear':
        dateRange = {
          startDate: moment().startOf('year').format('YYYY-MM-DD'),
          endDate: moment().endOf('year').format('YYYY-MM-DD')
        };
        setDateRangeText('This Year');
        break;
      case 'custom':
        // Keep dropdown open for custom range
        dateRange = customRange;
        if (customRange.startDate && customRange.endDate) {
          const start = moment(customRange.startDate).format('MMM D, YYYY');
          const end = moment(customRange.endDate).format('MMM D, YYYY');
          setDateRangeText(`${start} - ${end}`);
        }
        break;
      default:
        dateRange = { startDate: '', endDate: '' };
        setDateRangeText('All Transactions');
    }

    console.log("Selected date range:", customRange); // Add this

    if (optionId !== 'custom' || (customRange.startDate && customRange.endDate)) {
      onFilterChange(dateRange);
    }
  };

  const handleCustomDateChange = (field, value) => {
    const newRange = { ...customRange, [field]: value };
    setCustomRange(newRange);
    
    if (newRange.startDate && newRange.endDate) {
      const start = moment(newRange.startDate).format('MMM D, YYYY');
      const end = moment(newRange.endDate).format('MMM D, YYYY');
      setDateRangeText(`${start} - ${end}`);
      onFilterChange(newRange);
    }
  };

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <div 
        className={`flex items-center justify-between px-4 py-2.5 border rounded-lg cursor-pointer bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
          isOpen ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-gray-200 hover:border-emerald-400'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        role="combobox"
      >
        <div className="flex items-center space-x-2">
          <LuCalendar className={`text-lg ${isOpen ? 'text-emerald-500' : 'text-gray-500'}`} />
          <span className={`text-sm font-medium ${isOpen ? 'text-emerald-700' : 'text-gray-700'}`}>
            {dateRangeText}
          </span>
        </div>
        <div className="flex items-center">
          {selectedOption !== 'all' && (
            <span className="mr-2 py-0.5 px-2 text-xs font-medium bg-emerald-50 text-emerald-600 rounded-full">
              Active
            </span>
          )}
          <LuChevronDown 
            className={`text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} 
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute z-40 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden"
          style={{ 
            maxHeight: '340px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
          role="listbox"
        >
          <div className="max-h-72 overflow-y-auto">
            {filterOptions.map((option) => (
              <div key={option.id} className="px-1 py-0.5">
                <div
                  className={`flex items-center cursor-pointer px-4 py-2.5 rounded-md transition-colors duration-200 ${
                    selectedOption === option.id 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  onClick={() => handleOptionSelect(option.id)}
                  role="option"
                  aria-selected={selectedOption === option.id}
                >
                  <div className={`w-5 h-5 mr-3 flex items-center justify-center rounded-full border ${
                    selectedOption === option.id 
                      ? 'border-emerald-500 bg-emerald-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedOption === option.id && (
                      <LuCheck className="text-white text-sm" />
                    )}
                  </div>
                  <span className={`${selectedOption === option.id ? 'font-medium' : ''}`}>
                    {option.label}
                  </span>
                </div>
                
                {/* Custom Date Range Picker */}
                {selectedOption === 'custom' && option.id === 'custom' && (
                  <div className="mt-2 mx-2 p-4 space-y-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-gray-500">
                          Start Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={customRange.startDate}
                            onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
                            className="w-full p-2.5 border border-gray-200 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                            max={customRange.endDate || moment().format('YYYY-MM-DD')}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-gray-500">
                          End Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={customRange.endDate}
                            onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
                            className="w-full p-2.5 border border-gray-200 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                            min={customRange.startDate}
                            max={moment().format('YYYY-MM-DD')}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Apply button for custom date range */}
                    <button
                      className={`w-full mt-3 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                        customRange.startDate && customRange.endDate
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm hover:shadow'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => {
                        if (customRange.startDate && customRange.endDate) {
                          handleOptionSelect('custom');
                          setIsOpen(false);
                        }
                      }}
                      disabled={!customRange.startDate || !customRange.endDate}
                    >
                      Apply Date Range
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;