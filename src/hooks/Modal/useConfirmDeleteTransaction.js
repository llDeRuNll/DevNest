import { useDispatch } from "react-redux";
import { transactionDelete } from "../../redux/transactions/operations";
import toast from "react-hot-toast";
import { useUserContext } from "../../utils/UserContext/useUserContext";

export const useConfirmDeleteTransaction = () => {
  const { closeModal } = useUserContext();
  const dispatch = useDispatch();

  const confirmDelete = async ({ _id, type, sum }) => {
    try {
      await dispatch(transactionDelete({ _id, type, sum })).unwrap();
      toast.success("transaction deleted");
      closeModal();
    } catch (err) {
      toast.error(err.message || "error delete");
    }
  };

  return confirmDelete;
};
