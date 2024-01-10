import { usePageTitle } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Notifications from "./Notifications";

const NotificationsPage = () => {
  usePageTitle("Notifications");

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
      </section>

      <div className="flex flex-col sm:flex-row  justify-between items-center">
        <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Notifications</h1>
      </div>

      <Notifications />
    </>
  );
};

export default NotificationsPage;
