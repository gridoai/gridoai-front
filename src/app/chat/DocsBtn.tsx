import { Button } from "../../components/ui/button";
import Link from "next/link";

export function DocsBtn() {
  return (
    <Link href="/documents">
      <Button variant="outline">Manage documents</Button>
    </Link>
  );
}
