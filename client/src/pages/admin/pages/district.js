import React, { useEffect, useState } from "react";
import Card from "../../../components/cards/cards";
import { Chart as Chartjs } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import { getDistricts } from "../../../http/usersApi";

export default function District() {
  const [staticts, setStaticts] = useState("");
  useEffect(() => {
    getDistricts()
      .then((result) => {
        if (result.data.Status) {
          setStaticts(result.data.Result);
        } else {
          alert(result.data.Error);
          console.log(Chartjs);
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
          value="18"
          iconClass="fa-comments"
          cardClass="border-left-warning"
          textClass="text-warning"
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
                    labels: ["2022", "2023", "2024"],
                    datasets: [
                      {
                        label: "Tuman",
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
                    labels: ["Foydalanuvchi", "Tadbirkor"],
                    datasets: [
                      {
                        label: "My First Dataset",
                        data: [50, 100],
                        backgroundColor: [
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
