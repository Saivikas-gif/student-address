
// Simple inline icons (no external dependency, avoids React version conflicts)
function UsersIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function BuildingIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
        </svg>
    );
}

function AddressCheckIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function AddressXIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
            <line x1="9.5" y1="7.5" x2="14.5" y2="12.5" />
            <line x1="14.5" y1="7.5" x2="9.5" y2="12.5" />
        </svg>
    );
}

function PercentIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="5" x2="5" y2="19" />
            <circle cx="6.5" cy="6.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
    );
}

import React, { useMemo } from "react";
function formatIN(num) {
    return Number(num || 0).toLocaleString("en-IN");
}

export default function DashboardCards({ totalStudents,
    totalBranches,
    totalAddressed,
    totalWithoutAddress,
    loading,
    overallNotUpdatedPercentage
}) {

    const overallPercentage = useMemo(() => {
        if (totalStudents === 0) return 0;
        return (totalAddressed / totalStudents) * 100;
    }, [totalAddressed, totalStudents]);

    {/* KPI Cards */ }
    return (
        <div className="sbd-kpi-row">
            <div className="sbd-card">
                <div className="sbd-icon-circle" style={{ backgroundColor: "#2f80ed" }}>
                    <UsersIcon />
                </div>
                <div className="sbd-card-label">Total Students</div>
                <div className="sbd-card-value">
                    {loading ? "…" : formatIN(totalStudents)}
                </div>
            </div>

            <div className="sbd-card">
                <div className="sbd-icon-circle" style={{ backgroundColor: "#9b51e0" }}>
                    <BuildingIcon />
                </div>
                <div className="sbd-card-label">Total Branches</div>
                <div className="sbd-card-value">{loading ? "…" : totalBranches}</div>
            </div>

            <div className="sbd-card">
                <div className="sbd-icon-circle" style={{ backgroundColor: "#27ae60" }}>
                    <AddressCheckIcon />
                </div>
                <div className="sbd-card-label">Students With Address</div>
                <div className="sbd-card-value">
                    {loading ? "…" : formatIN(totalAddressed)}
                </div>
            </div>

            <div className="sbd-card">
                <div className="sbd-icon-circle" style={{ backgroundColor: "#eb5757" }}>
                    <AddressXIcon />
                </div>
                <div className="sbd-card-label">Student Address Not Updated</div>
                <div className="sbd-card-value">
                    {loading ? "…" : formatIN(totalWithoutAddress)}
                </div>
            </div>

            <div className="sbd-card">
                <div className="sbd-icon-circle" style={{ backgroundColor: "#f2994a" }}>
                    <PercentIcon />
                </div>
                <div className="sbd-card-label">Overall Addressed %</div>
                <div className="sbd-card-value">
                    {loading ? "…" : `${overallPercentage.toFixed(1)}%`}
                </div>
            </div>

            <div className="sbd-card">
                <div className="sbd-icon-circle" style={{ backgroundColor: "#f2994a" }}>
                    <PercentIcon />
                </div>
                <div className="sbd-card-label">Overall Addressed Not Updated %</div>
                <div className="sbd-card-value">
                    {loading ? "…" : `${overallNotUpdatedPercentage.toFixed(1)}%`}
                </div>
            </div>
        </div>
    );
}