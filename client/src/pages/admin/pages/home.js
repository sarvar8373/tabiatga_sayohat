import React, { useEffect, useState } from "react";
import Card from "../../../components/cards/cards";
import { Bar, Doughnut } from "react-chartjs-2";
import { getStatistics } from "../../../http/usersApi";

export default function Home() {
  const [staticts, setStaticts] = useState("");
  useEffect(() => {
    getStatistics()
      .then((result) => {
        if (result.data.Status) {
          setStaticts(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Bosh sahifa</h1>
      <div className="row">
        <Card
          title="Foydalanuvchilar"
          value={staticts.users}
          iconClass="fa-users"
          cardClass="border-left-primary"
          textClass="text-primary"
        />
        <Card
          title="Sayohat kompaniyari"
          value={staticts.tours}
          iconClass="fa-building"
          cardClass="border-left-success"
          textClass="text-success"
        />
        <Card
          title="Tashkilotlar"
          iconClass="fa-clipboard-list"
          cardClass="border-left-info"
          textClass="text-info"
          value={staticts.organization_details}
        />
        <Card
          title="Yuborilgan so'rovlar"
          iconClass="fa-comments"
          cardClass="border-left-warning"
          textClass="text-warning"
          value={staticts.notificationCount}
        />
      </div>
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Jadval</h6>
            </div>
            <div className="card-body">
              <div className="chart-area">
                {" "}
                <Bar
                  data={{
                    labels: ["2024"],
                    datasets: [
                      {
                        label: "Kemping",
                        data: [200, 100, 300],
                      },
                      {
                        label: "Piyoda yurish",
                        data: [50, 60, 90],
                      },
                      {
                        label: "Plyaj sayohatlari",
                        data: [10, 20, 30],
                      },
                      {
                        label: "Serfinglar",
                        data: [50, 60, 90],
                      },
                      {
                        label: "Velikda yurish",
                        data: [50, 60, 90],
                      },
                      {
                        label: "Safarlar",
                        data: [50, 60, 90],
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Diagramma</h6>
            </div>
            <div className="card-body">
              <div className="chart-pie pt-4 pb-2">
                <Doughnut
                  data={{
                    labels: [
                      "Top maskanlar",
                      "Ko'p so'rov yuborilgan maskanlar",
                      "Maskanlar",
                    ],
                    datasets: [
                      {
                        label: "Soni",
                        data: [300, 50, 100],
                        backgroundColor: [
                          "rgb(255, 99, 132)",
                          "rgb(54, 162, 235)",
                          "rgb(255, 205, 86)",
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
