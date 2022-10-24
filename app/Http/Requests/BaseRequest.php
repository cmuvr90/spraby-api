<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class BaseRequest
 * @package App\Http\Requests
 */
class BaseRequest extends FormRequest
{

    const PARAMS_KEY = [
        'FIELDS' => 'fields',
        'SEARCH' => 'search',
        'SORT' => 'sort',
        'WITH' => 'with'
    ];

    /**
     * @param $prefix
     * @param $accessFields
     * @return array[]
     */
    public function getQueryParams($prefix, $accessFields): array
    {
        return [
            self::PARAMS_KEY['FIELDS'] => self::getQueryFields($prefix, $accessFields),
            self::PARAMS_KEY['SEARCH'] => self::getQuerySearch($prefix, $accessFields),
            self::PARAMS_KEY['SORT'] => self::getQuerySort($prefix, $accessFields)
        ];
    }

    /**
     * @param string $prefix
     * @param array $accessFields
     * @return array
     */
    public function getQueryFields($prefix = '', $accessFields = []): array
    {
        $fieldValues = [];
        $fields = [];

        $fieldsData = $this->get(self::PARAMS_KEY['FIELDS']);

        if ($fieldsData !== null) {
            $fieldValues = array_map(function ($fieldValue) {
                return trim($fieldValue);
            }, explode(',', $fieldsData));
        }

        foreach ($accessFields as $accessField) {
            if (!$fieldValues || in_array($accessField, $fieldValues)) $fields[] = $prefix . $accessField;
        }

        return $fields;
    }

    /**
     * @param string $prefix
     * @param array $accessFields
     * @return array
     */
    public function getQuerySearch($prefix = '', $accessFields = []): array
    {
        $field = '';
        $value = '';

        $searchData = $this->get(self::PARAMS_KEY['SEARCH']);

        if ($searchData !== null) {
            $searchData = explode('|', $searchData);
            if (count($searchData) === 2 && in_array($searchData[0], $accessFields)) {
                $field = $prefix . '' . $searchData[0];
                $value = $searchData[1];
            }
        }

        return [
            'field' => $field,
            'value' => $value
        ];
    }

    /**
     * @param string $prefix
     * @param array $accessFields
     * @return array
     */
    public function getQuerySort($prefix = '', $accessFields = []): array
    {
        $field = '';
        $direction = '';

        $searchData = $this->get(self::PARAMS_KEY['SORT']);

        if ($searchData !== null) {
            $searchData = explode('|', $searchData);
            if (count($searchData) === 2 && in_array($searchData[0], $accessFields)) {
                $field = $prefix . '' . $searchData[0];
                $direction = $searchData[1];
            }
        }

        return [
            'field' => $field,
            'direction' => $direction
        ];
    }
}
