import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchDashboardData } from "../features/dashboard/dashboardSlice";
import {
  FaHeart,
  FaExclamationCircle,
  FaCalendarAlt,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";

// ──────────────────────────────────────────────────────────────
//  STYLED COMPONENTS (Exact Base44 Tailwind → CSS-in-JS)
// ──────────────────────────────────────────────────────────────
const Container = styled.div`
  padding: 1rem;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #fff7ed, #fff1e6, #ffeef0);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const MaxWidth = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-top: 0.5rem;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(to right, #f97316, #e11d48);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(to right, #ea580c, #be123c);
    transform: translateY(-1px);
  }
`;

// ─── Stats Grid ─────────────────────────────────────────────
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// ─── Card Base ──────────────────────────────────────────────
const Card = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 1rem;
  background: linear-gradient(to right, #fff7ed, #fce7f3);
  border-bottom: 1px solid #fee2e2;
`;

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

// ─── Stats Card ─────────────────────────────────────────────
const StatsCardWrapper = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #6b7280;
  font-weight: 500;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
`;

const StatIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  background: ${({ gradient }) => gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px ${({ shadow }) => shadow || "rgba(0,0,0,0.2)"};
`;

// ─── Upcoming Item Card ─────────────────────────────────────
const UpcomingItem = styled.div`
  background: #ecfdf5;
  border: 1.5px solid #34d399;
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(52, 211, 153, 0.1);
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: #166534;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Dot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background: #10b981;
  border-radius: 50%;
`;

const ItemTitle = styled.div`
  font-weight: 700;
  color: #111827;
  font-size: 1.1rem;
`;

const ItemDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.925rem;
`;

// ──────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ──────────────────────────────────────────────────────────────
export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    upcomingVaccinations = [],
    upcomingDewormings = [],
    status,
    error,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (status === "idle") dispatch(fetchDashboardData());
  }, [dispatch, status]);

  // ─── Compute Stats ────────────────────────────────────────
  const uniquePets = new Set([
    ...upcomingVaccinations.map((v) => v.pet._id),
    ...upcomingDewormings.map((d) => d.pet._id),
  ]);
  const totalPets = uniquePets.size;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allItems = [
    ...upcomingVaccinations.map((v) => ({
      ...v,
      type: "vaccination",
      name: v.vaccineName,
    })),
    ...upcomingDewormings.map((d) => ({
      ...d,
      type: "deworming",
      name: "Deworming",
    })),
  ].map((item) => {
    const dueDate = new Date(item.nextDueDate);
    const daysUntil = (dueDate - today) / (1000 * 60 * 60 * 24);
    let status = "upcoming";
    if (daysUntil < 0) status = "overdue";
    else if (daysUntil <= 7) status = "due_soon";
    return { ...item, daysUntil, status, dueDate };
  });

  const overdueCount = allItems.filter((i) => i.status === "overdue").length;
  const dueSoonCount = allItems.filter((i) => i.status === "due_soon").length;
  const upToDateCount = allItems.filter((i) => i.status === "upcoming").length;

  // ─── Render ───────────────────────────────────────────────
  if (status === "loading") {
    return (
      <Container>
        <MaxWidth>
          <p className="text-center">Loading...</p>
        </MaxWidth>
      </Container>
    );
  }

  if (status === "failed") {
    return (
      <Container>
        <MaxWidth>
          <p className="text-red-600 text-center">Error: {error}</p>
        </MaxWidth>
      </Container>
    );
  }

  return (
    <Container>
      <MaxWidth>
        {/* Header */}
        <Header>
          <div>
            <Title>Dashboard</Title>
            <Subtitle>Welcome back! Here's your pet health overview</Subtitle>
          </div>
          <AddButton>
            <FaPlus /> Add New Pet
          </AddButton>
        </Header>

        {/* Stats */}
        <StatsGrid>
          <StatsCardWrapper>
            <div>
              <StatLabel>Total Pets</StatLabel>
              <StatValue>{totalPets}</StatValue>
            </div>
            <StatIcon
              gradient="linear-gradient(to right, #ec4899, #f43f5e)"
              shadow="rgba(236, 72, 153, 0.3)"
            >
              <FaHeart />
            </StatIcon>
          </StatsCardWrapper>

          <StatsCardWrapper>
            <div>
              <StatLabel>Overdue Items</StatLabel>
              <StatValue>{overdueCount}</StatValue>
            </div>
            <StatIcon
              gradient="linear-gradient(to right, #ef4444, #f43f5e)"
              shadow="rgba(239, 68, 68, 0.3)"
            >
              <FaExclamationCircle />
            </StatIcon>
          </StatsCardWrapper>

          <StatsCardWrapper>
            <div>
              <StatLabel>Due Soon</StatLabel>
              <StatValue>{dueSoonCount}</StatValue>
            </div>
            <StatIcon
              gradient="linear-gradient(to right, #f59e0b, #fb923c)"
              shadow="rgba(245, 158, 11, 0.3)"
            >
              <FaCalendarAlt />
            </StatIcon>
          </StatsCardWrapper>

          <StatsCardWrapper>
            <div>
              <StatLabel>Up to Date</StatLabel>
              <StatValue style={{ color: "#16a34a" }}>
                {upToDateCount}
              </StatValue>
            </div>
            <StatIcon
              gradient="linear-gradient(to right, #10b981, #059669)"
              shadow="rgba(16, 185, 129, 0.3)"
            >
              <FaCheckCircle />
            </StatIcon>
          </StatsCardWrapper>
        </StatsGrid>

        {/* Upcoming Care */}
        <Card>
          <CardHeader>
            <CardTitle>
              <FaCalendarAlt className="text-orange-600" />
              Upcoming Care Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {allItems.length === 0 ? (
              <div className="text-center py-12">
                <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  All Caught Up!
                </h3>
                <p className="text-gray-600">
                  No upcoming vaccinations or deworming scheduled.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {allItems.map((item) => (
                  <UpcomingItem key={`${item.type}-${item.id}`}>
                    <div>
                      <StatusBadge>
                        <Dot />
                        {item.status.replace("_", " ").toUpperCase()}
                      </StatusBadge>
                      <ItemTitle>
                        {item.pet.name} - {item.name}
                      </ItemTitle>
                      <ItemDetail>
                        <FaCalendarAlt />
                        Due:{" "}
                        {item.dueDate.toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </ItemDetail>
                      {item.type === "vaccination" && (
                        <ItemDetail
                          style={{ color: "#16a34a", fontWeight: 600 }}
                        >
                          {item.vaccineName}
                        </ItemDetail>
                      )}
                    </div>
                    <FaCalendarAlt
                      style={{
                        fontSize: "1.8em",
                        color: "#fb923c",
                        marginTop: "8px",
                      }}
                    />
                  </UpcomingItem>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </MaxWidth>
    </Container>
  );
}
