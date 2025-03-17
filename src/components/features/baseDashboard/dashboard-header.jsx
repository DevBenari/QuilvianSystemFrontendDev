"use client";

import React, { useState, useEffect } from "react";

import { FaHospital } from "react-icons/fa";

export const DashboardHeader = ({
  hospitalName = "RS INTERNAL",
  badgeText = "DASHBOARD",
  divisionText = "Dashboard Sistem Informasi",
  icon = FaHospital,
  bgColor = "#1a237e",
  bgGradient = "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
  badgeColor = "#ff3d00",
  badgeTextColor = "white",
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const IconComponent = icon;

  return (
    <div className="dashboard-header p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className="dashboard-logo me-3">
            <IconComponent size={60} className="logo-icon" />
          </div>
          <div className="dashboard-info">
            <h1 className="dashboard-name mb-0">{hospitalName}</h1>
            <div className="division-name">
              <span className="badge-dashboard">{badgeText}</span>
              <span className="division-text">{divisionText}</span>
            </div>
          </div>
        </div>
        <div className="datetime-display text-end">
          <div className="date-info">
            {currentTime.toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="time-info">
            {currentTime.toLocaleTimeString("id-ID")}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-header {
          border-radius: 0.5rem;
          background: ${bgColor};
          color: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
        }

        .dashboard-header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${bgGradient};
          z-index: 0;
        }

        .dashboard-header > div {
          position: relative;
          z-index: 1;
        }

        .dashboard-name {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: #ffffff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .division-name {
          display: flex;
          align-items: center;
          margin-top: 8px;
        }

        .badge-dashboard {
          background-color: ${badgeColor};
          color: ${badgeTextColor};
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: bold;
          margin-right: 12px;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .division-text {
          font-size: 1.2rem;
          color: #ffffff;
          font-weight: 500;
        }

        .datetime-display {
          background: rgba(0, 0, 0, 0.25);
          padding: 12px 18px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .date-info {
          font-size: 1rem;
          color: #ffffff;
        }

        .time-info {
          font-size: 2.2rem;
          font-weight: 700;
          line-height: 1.1;
          margin-top: 5px;
          color: #ffffff;
        }

        .logo-icon {
          background: rgba(255, 255, 255, 0.15);
          padding: 12px;
          border-radius: 50%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .dashboard-header .d-flex {
            flex-direction: column;
            text-align: center;
          }

          .datetime-display {
            margin-top: 15px;
            text-align: center;
          }

          .dashboard-info,
          .division-name {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};
