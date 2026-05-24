# Schema draft

## `profiles`

- `id`
- `full_name`
- `role` (`super_admin`, `nhan_vien`, `cong_tac_vien`)
- `phone`
- `avatar_url`
- `specialty_districts` jsonb
- `specialty_segment`
- `bio`
- `facebook_url`
- `tiktok_url`
- `zalo_url`
- `is_active`

## `listings`

- `id`
- `code`
- `slug`
- `address_line`
- `district`
- `ward`
- `street`
- `price_value`
- `price_label`
- `width_m`
- `length_m`
- `area_m2`
- `layout_text`
- `house_type`
- `legal_status`
- `occupancy_status`
- `description`
- `advantages` text[]
- `caution_notes`
- `status`
- `manager_profile_id`
- `created_by`
- `approved_by`
- `published_at`

## `videos`

- `id`
- `slug`
- `title`
- `description`
- `video_source_type` (`tiktok`, `youtube`, `facebook`, `cdn`)
- `video_url`
- `embed_code` nullable
- `embed_url` nullable
- `thumbnail_url`
- `duration_seconds`
- `content_type` (`review_nha`, `kien_thuc`)
- `listing_id` nullable
- `reviewer_profile_id`
- `reviewer_slug`
- `reviewer_name`
- `district_tag`
- `street_tag`
- `price_tag`
- `house_type_tag`
- `approval_status`
- `created_at`
- `published_at`

## `buyer_leads`

- `id`
- `full_name`
- `phone`
- `zalo`
- `preferred_district`
- `budget_label`
- `house_type`
- `dimensions_request`
- `purpose`
- `notes`
- `source_type`
- `source_id`
- `assigned_profile_id`
- `status`
- `created_at`

## `owner_leads`

- `id`
- `owner_name`
- `phone`
- `zalo`
- `address_line`
- `expected_price`
- `dimensions_text`
- `layout_text`
- `legal_status`
- `occupancy_status`
- `asset_media_urls` text[]
- `notes`
- `source_type`
- `assigned_profile_id`
- `status`
- `created_at`

## `activity_logs`

- `id`
- `actor_profile_id`
- `entity_type`
- `entity_id`
- `action`
- `payload` jsonb
- `created_at`

## Rules can co

- RLS cho lead theo `assigned_profile_id` va `role`
- Chi `super_admin` duoc set `approval_status=approved`
- Moi update listing/video/lead deu ghi `activity_logs`
- Khong cho query full lead list neu role la `cong_tac_vien`
- Feed public chi query video `approval_status=approved`
- MVP 1 khong can bucket video upload
- Admin role uu tien doc tu `profiles.role`; fallback `auth user metadata`
- Moi video can co `video_url` hoac `embed_code` hop le de render embed tren web
