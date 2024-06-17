import { BaseEndpoints } from "../../base";
import CouponEndpoints from "./_coupon";
import CustomerEndpoints from "./_customer";
import GameserverEndpoints from "./_gameserver";
import GiftcardEndpoints from "./_giftcard";
import NavlinkEndpoints from "./_navlink";
import OrderEndpoints from "./_order";
import ProductEndpoints from "./_product";
import SaleEndpoints from "./_sale";
import StoreEndpoints from "./_store";
import SubscriptionEndpoints from "./_subscription";
import TagEndpoints from "./_tag";

export default class ManagementEndpoints extends BaseEndpoints {
  public get stores(): StoreEndpoints {
    return new StoreEndpoints();
  }

  public get customers(): CustomerEndpoints {
    return new CustomerEndpoints();
  }

  public get gameservers(): GameserverEndpoints {
    return new GameserverEndpoints();
  }

  public get products(): ProductEndpoints {
    return new ProductEndpoints();
  }

  public get tags(): TagEndpoints {
    return new TagEndpoints();
  }

  public get navlinks(): NavlinkEndpoints {
    return new NavlinkEndpoints();
  }

  public get orders(): OrderEndpoints {
    return new OrderEndpoints();
  }

  public get subscriptions(): SubscriptionEndpoints {
    return new SubscriptionEndpoints();
  }

  public get coupons(): CouponEndpoints {
    return new CouponEndpoints();
  }

  public get giftcards(): GiftcardEndpoints {
    return new GiftcardEndpoints();
  }

  public get sales(): SaleEndpoints {
    return new SaleEndpoints();
  }
}
