import {
  Text,
  reactExtension,
  useCartLineTarget,
  useAppMetafields,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension(
  "purchase.checkout.cart-line-item.render-after",
  () => <Extension />
);

// Converts Shopify admin graphql ID to legacy resource ID
const gidToId = (gid: string): string => {
  const parts = gid.split("/");
  const id = parts[parts.length - 1];

  return id;
};

function Extension() {
  const { merchandise } = useCartLineTarget();
  const productId = merchandise.product.id;

  const shippingDelayMessageMetafield = useAppMetafields({
    type: "product",
    namespace: "custom",
    key: "shipping_delay_message",
  }).filter((entry) => entry.target.id === gidToId(productId));

  const shippingDelayMessage =
    shippingDelayMessageMetafield?.[0]?.metafield?.value;

  return <Text>{shippingDelayMessage}</Text>;
}
