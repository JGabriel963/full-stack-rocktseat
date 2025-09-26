import { useState } from "react";
import { Input } from "../components/input";
import { Button } from "../components/button";
import searchSvg from "../assets/search.svg";
import { RefundItem, type RefundItemProps } from "../components/refund-item";
import { CATEGORIES } from "../utils/categories";
import { formatCurrency } from "../utils/format-currency";
import { Pagination } from "../components/pagination";

const REFUND_EXAMPLE: RefundItemProps = {
  id: "123",
  name: "Rodrigo",
  category: "Transporte",
  amount: formatCurrency(34.5),
  categoryImg: CATEGORIES["transport"].icon,
};

export function Dashboard() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalOfPage, setTotalOfPage] = useState(10);
  const [refunds, setRefunds] = useState<RefundItemProps[]>([REFUND_EXAMPLE]);

  function fetchRefund(e: React.FormEvent) {
    e.preventDefault();
    console.log(name);
  }

  function handlePagination(action: "next" | "previous") {
    setPage((prevPage) => {
      if (action === "next" && prevPage < totalOfPage) {
        return prevPage + 1;
      }

      if (action === "previous" && prevPage > 1) {
        return prevPage - 1;
      }

      return prevPage;
    });
  }

  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

      <form
        onSubmit={fetchRefund}
        className="flex items-center justify-between  pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6"
      >
        <Input
          placeholder="Pesquisar"
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="icon">
          <img src={searchSvg} alt="Ícone de Pesquisa" className="w-5" />
        </Button>
      </form>

      <div className="my-6 flex flex-col gap-4 max-h-[342px] overflow-y-scroll">
        {refunds.map((refund) => (
          <RefundItem
            key={refund.id}
            data={refund}
            href={`/refund/${refund.id}`}
          />
        ))}
      </div>

      <Pagination
        current={page}
        total={totalOfPage}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
      />
    </div>
  );
}
